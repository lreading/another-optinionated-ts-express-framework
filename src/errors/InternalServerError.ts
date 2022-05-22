import { TSLogger } from '@lreading/typescript-winston-logger';

import { BaseApiError } from '.';
import { IAuthedRequest } from '../entity';
import { ServerErrorResponse } from '../response';

export class InternalServerError extends BaseApiError {
	constructor(req: IAuthedRequest) {
		super(req, new ServerErrorResponse());
	}
    
	logMessage(logger: TSLogger): void {
		logger.error(`Internal Server Error: ${this.getMessage()}`);
	}
}