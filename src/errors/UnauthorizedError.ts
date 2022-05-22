import { TSLogger } from '@lreading/typescript-winston-logger';

import { BaseApiError } from '.';
import { IAuthedRequest } from '../entity';
import { UnauthorizedResponse } from '../response';

export class UnauthorizedError extends BaseApiError {
	constructor(req: IAuthedRequest) {
		super(req, new UnauthorizedResponse());
	}
    
	logMessage(logger: TSLogger): void {
		logger.error(`Unauthorized: ${this.getMessage()}`);
	}
}
