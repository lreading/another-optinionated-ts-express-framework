import { TSLogger } from '@lreading/typescript-winston-logger';

import { BaseApiError } from '.';
import { IAuthedRequest } from '../entity';
import { NotFoundResponse } from '../response';

export class NotFoundError extends BaseApiError {
	constructor(req: IAuthedRequest) {
		super(req, new NotFoundResponse());
	}
    
	logMessage(logger: TSLogger): void {
		logger.error(`Not Found: ${this.getMessage()}`);
	}
}
