import { Response } from 'express';

import { BaseApiResponse, IApiResponse } from './BaseApiResponse';
import { HTTP_STATUS } from '../response/HttpStatus';

export interface IPagedApiResponse extends IApiResponse {
    get totalPages(): number;
    get currentPage(): number;
}

export abstract class PagedApiResponse extends BaseApiResponse implements IPagedApiResponse {
	private readonly _currentPage: number;
	get currentPage() { return this._currentPage; }

	private readonly _totalPages: number;
	get totalPages() { return this._totalPages; }

	constructor(status: HTTP_STATUS, body: unknown, currentPage: number, totalPages: number) {
		super(status, body);
		this._currentPage = currentPage;
		this._totalPages = totalPages;
	}

	override toResponse(res: Response): Response | void {
		const code: number = this.status;
		return res.status(code)
			.json({
				status: code,
				body: this.body,
				currentPage: this.currentPage,
				totalPages: this.totalPages
			});
	}
}