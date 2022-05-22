import { Response } from 'express';
import { TSLogger } from '@lreading/typescript-winston-logger';

import { BaseApiResponse } from '../entity';
import { IAuthedRequest } from '../entity/IAuthedRequest';

export interface IApiError {
	logMessage(logger: TSLogger): void;
}

export abstract class BaseApiError extends Error implements IApiError {
	private readonly verb: string;
	private readonly path: string;
	private readonly userId: unknown;
	protected readonly response: BaseApiResponse;

	constructor(req: IAuthedRequest, response: BaseApiResponse) {
		super('Api Error');
		this.verb = req.method;
		this.path = req.path;
		this.userId = req.user.id;
		this.response = response;
	}

	abstract logMessage(logger: TSLogger): void;

	protected getMessage(): string {
		return `${this.verb.toUpperCase()} ${this.path}: ${this.userId || '(unkown user)'}`;
	}

	toResponse(res: Response): Response | void {
		return this.response.toResponse(res);
	}
}
