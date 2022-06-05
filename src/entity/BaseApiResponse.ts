import { Response } from 'express';

import { HTTP_STATUS } from '../response/HttpStatus';

export interface IApiResponse {
    get status(): HTTP_STATUS;
    get body(): any;
	toResponse(res: Response): Response | void;
}

export abstract class BaseApiResponse implements IApiResponse {
	private readonly _status: HTTP_STATUS;
	get status() { return this._status; }

	private readonly _body: unknown;
	get body() { return this._body; }

	constructor(status: HTTP_STATUS, body: unknown) {
		this._status = status;
		this._body = body;
	}

	toResponse(res: Response): Response | void {
		const code: number = this._status;
		return res.status(code)
			.json({
				status: code,
				body: this._body
			});
	}
}
