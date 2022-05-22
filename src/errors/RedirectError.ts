import { TSLogger } from '@lreading/typescript-winston-logger';

import { BaseApiError } from '.';
import { IAuthedRequest } from '../entity';
import { RedirectResponse } from '../response';

// This is not strictly an error, and exposes some of the problems associated
// with using errors as control flows.
// With that said, this does give us an opportuntiy to audit redirects
export class RedirectError extends BaseApiError {
	private readonly redirectLocation: string;

	constructor(req: IAuthedRequest, redirectLocation: string) {
		super(req, new RedirectResponse(redirectLocation));
		this.redirectLocation = redirectLocation;
	}

	logMessage(logger: TSLogger): void {
		logger.audit(`Redirecting request to: ${this.redirectLocation}`);
	}
}
