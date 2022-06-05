import { TSLogger, getLogger } from '@lreading/typescript-winston-logger';
import { EntityTarget, Repository, FindManyOptions } from 'typeorm';

import { dbManager } from '../repo';
import { IEntity, PagedResult } from '../entity';

export interface IReadService<T extends IEntity<K>, K> {
    exists(id: K): Promise<boolean>;
    get(): Promise<T[]>;
    getCount(): Promise<number>;
    getPage(pageNum: number, findOptions?: FindManyOptions<T>): Promise<PagedResult>;
    getById(id: K): Promise<T>;
}

export abstract class BaseReadService<T extends IEntity<K>,K> implements IReadService<T,K> {
    private _repo: Repository<T> = null;
    private readonly target: EntityTarget<T>;
    protected readonly logger: TSLogger
    protected readonly resultsPerPage = 20;

    constructor(target: EntityTarget<T>, loggerName: string) {
        this.target = target;
        this.logger = getLogger(loggerName);
    }

    protected get repo(): Repository<T> {
        if (this._repo == null) {
            this._repo = dbManager.connection.getRepository(this.target);
        }
        return this._repo;
    }

    async get(): Promise<T[]> {
        return await this.repo.find();
    }

    async getCount(options?: FindManyOptions<T>): Promise<number> {
        return await this.repo.count(options);
    }

    async getPage(pageNum: number, findOptions?: FindManyOptions<T>): Promise<PagedResult> {
        const res = new PagedResult();
        res.results = await this.repo.find(Object.assign({
            skip: Math.max((pageNum - 1) * this.resultsPerPage, 0),
            take: this.resultsPerPage
        }, findOptions));
        res.currentPage = pageNum;
        const totalRecords = await this.getCount(findOptions);
        res.totalPages = Math.ceil(totalRecords / this.resultsPerPage);

        return res;
    }

    async getById(id: K): Promise<T> {
        const entity = await this.repo.findOne(id);
        return entity || null;
    }

    async exists(id: K): Promise<boolean> {
        const count = await this.repo.count({ where: { id }});
        return count > 0;
    }
}