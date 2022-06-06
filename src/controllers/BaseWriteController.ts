import { ClassConstructor, plainToInstance } from 'class-transformer';

import {
	Audit,
	BadRequestError,
	IAuthedRequest,
	IEntity,
	IWriteService,
	NotFoundError
} from '../';
import { IReadControler, BaseReadController } from './';

export interface IWriteController<T extends IEntity<K>, K> extends IReadControler<T, K> {
	add(req: IAuthedRequest): Promise<T>;
	addMany(req: IAuthedRequest): Promise<T[]>;
	update(req: IAuthedRequest): Promise<T>;
	delete(req: IAuthedRequest): Promise<boolean>
}

export abstract class BaseWriteController<T extends IEntity<K>, K> extends BaseReadController<T, K> implements IWriteController<T, K> {
	protected readonly service: IWriteService<T, K>;
	private readonly cls: ClassConstructor<T>;

	constructor(loggerName: string, service: IWriteService<T, K>, cls: ClassConstructor<T>) {
		super(loggerName, service);
		this.service = service;
		this.cls = cls;
	}

	protected getTyped(entity: T): T {
		return plainToInstance(this.cls, entity);
	}

	protected validateId(req: IAuthedRequest): K {
		const id = req.params.id as unknown as K;
		if (!id) {
			throw new BadRequestError(req, 'Id is a required uri parameter');
		}
		return id;
	}

	@Audit()
	async add(req: IAuthedRequest): Promise<T> {
		return this.service.add(req, this.getTyped(req.body));
	}

	@Audit()
	async addMany(req: IAuthedRequest): Promise<T[]> {
		if (!Array.isArray(req.body)) {
			throw new BadRequestError(req, 'Add many requires an array body');
		}
		const entities: T[] = [];
		req.body.forEach((e) => entities.push(plainToInstance(this.cls, e)));
		return await this.service.addMany(req, entities);
	}

	@Audit()
	async update(req: IAuthedRequest): Promise<T> {
		const id = this.validateId(req);
		const exists = await this.service.exists(id);
		if (!exists) {
			throw new NotFoundError(req);
		}

		const entity = this.getTyped(req.body);
		entity.id = id;
		return await this.service.update(req, id, entity);
	}

	@Audit()
	async delete(req: IAuthedRequest): Promise<boolean> {
		const id = this.validateId(req);
		const exists = await this.service.exists(id);
		if (!exists) {
			throw new NotFoundError(req);
		}

		return await this.service.delete(req, id);
	}
}