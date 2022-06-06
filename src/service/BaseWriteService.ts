import { EntityTarget } from 'typeorm';

import { BadRequestError } from '../errors';
import { BaseReadService, IReadService } from './';
import { IAuthedRequest, IEntity } from '../entity';

export interface IWriteService<T extends IEntity<K>, K> extends IReadService<T,K> {
    add(req: IAuthedRequest, entity: T): Promise<T>;
    addMany(req: IAuthedRequest, entities: T[]): Promise<T[]>;
    update(req: IAuthedRequest, id: K, entity: T): Promise<T>;
    delete(req: IAuthedRequest, id: K): Promise<boolean>;
}

export abstract class BaseWriteService<T extends IEntity<K>, K> extends BaseReadService<T,K> implements IWriteService<T, K> {
	constructor(target: EntityTarget<T>, loggerName: string) {
		super(target, loggerName);
	}

	protected async validate(req: IAuthedRequest, entity: T): Promise<any> {
		const validationError = await entity.getValidationErrors();
		if (validationError) {
			throw new BadRequestError(req, validationError);
		}
	}

	async add(req: IAuthedRequest, entity: T): Promise<T> {
		await this.validate(req, entity);
		const res = await this.addWithoutValidation(entity);
		this.logger.audit(`User ${req.user.id} has added ${typeof res} with id ${res.id}`);
		return res;
	}

	private async addWithoutValidation(entity: T): Promise<T> {
		const inserted = await this.repo.insert(entity as any);
		return await this.repo.findOne(inserted.identifiers[0]);
	}

	async addMany(req: IAuthedRequest, entities: T[]): Promise<T[]> {
		const added: T[] = [];
		for (let i = 0; i < entities.length; i++) {
			const inserted = await this.add(req, entities[i]);
			added.push(inserted);
		}

		return added;
	}

	async update(req: IAuthedRequest, id: K, entity: T): Promise<T> {
		await this.validate(req, entity);
		await this.repo.update(id, entity as any);
		const res = await this.repo.findOne(id);
		this.logger.audit(`User ${req.user.id} has updated ${typeof res} with id ${res.id}`);
		return res;
	}

	async delete(req: IAuthedRequest, id: K): Promise<boolean> {
		await this.repo.delete(id);
		this.logger.audit(`User ${req.user.id} has deleted entity with id ${id}`);
		return true;
	}
}