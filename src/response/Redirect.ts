import { Response } from 'express';

import { BaseApiResponse } from '../entity';
import { HTTP_STATUS } from '.';

export class RedirectResponse extends BaseApiResponse {
	private readonly redirectLocation: string;

	constructor(redirectLocation: string) {
		super(HTTP_STATUS.temporaryRedirect, redirectLocation);
		this.redirectLocation = redirectLocation;
	}

	override toResponse(res: Response): void | Response {
		return res.redirect(this.redirectLocation);
	}
}
