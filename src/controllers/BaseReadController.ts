import { getLogger, TSLogger } from '@lreading/typescript-winston-logger';
import { Request } from 'express';

import {
	BadRequestError,
	HTTP_STATUS,
	IAuthedRequest,
	IEntity
} from '../';

import { PagedApiResponse } from '../entity';
import { IReadService } from '../service';

export interface IReadControler<T extends IEntity<K>, K> {
    getAll(): Promise<T[]>;
    getPage(req: Request): Promise<PagedApiResponse>;
    getById(req: Request): Promise<T>;
}

export abstract class BaseReadController<T extends IEntity<K>, K> implements IReadControler<T,K> {
	protected readonly logger: TSLogger;
	protected readonly service: IReadService<T,K>;

	constructor(loggerName: string, readService: IReadService<T,K>) {
		this.logger = getLogger(loggerName);
		this.service = readService;
	}

	async getAll(): Promise<T[]> {
		return await this.service.getAll();
	}

	async getPage(req: IAuthedRequest): Promise<PagedApiResponse> {
		const pageNum = parseInt(req.params.pageNum);
		if (isNaN(pageNum) || pageNum < 0) {
			throw new BadRequestError(req, 'Invalid page number');
		}
		const data = await this.service.getPage(pageNum);
		return new PagedApiResponse(HTTP_STATUS.ok, data);
	}

	async getById(req: IAuthedRequest): Promise<T> {
		const id: K = req.params.id as unknown as K;
		if (!id) {
			throw new BadRequestError(req, 'Id is a required uri parameter');
		}
        
		return await this.service.getById(id);
	}
}