import { TSLogger } from '@lreading/typescript-winston-logger';

import { BaseApiError } from '.';
import { ForbiddenResponse } from '../response';
import { IAuthedRequest } from '../entity';

export class ForbiddenError extends BaseApiError {
	constructor(req: IAuthedRequest) {
		super(req, new ForbiddenResponse());
	}
    
	logMessage(logger: TSLogger): void {
		logger.error(`Forbidden: ${this.getMessage()}`);
	}
}
