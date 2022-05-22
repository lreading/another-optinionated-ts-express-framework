import { TSLogger } from '@lreading/typescript-winston-logger';

import { BadRequestResponse } from '../response';
import { BaseApiError } from '.';
import { IAuthedRequest } from '../entity';

export class BadRequestError extends BaseApiError {
	private readonly _errorMessage: string;
	get errorMessage(): string { return this._errorMessage; }

	constructor(req: IAuthedRequest, errorMessage?: string) {
		super(req, new BadRequestResponse(errorMessage));
		this._errorMessage = errorMessage || 'unknown';
	}

	logMessage(logger: TSLogger): void {
		logger.error(`Bad Request: ${this._errorMessage} ${this.getMessage()}`);
	}
}
