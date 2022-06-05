import { Response } from 'express';

import { BaseApiResponse, IApiResponse, IPagedResult } from './';
import { HTTP_STATUS } from '../response/HttpStatus';

export interface IPagedApiResponse extends IApiResponse {
    get totalPages(): number;
    get currentPage(): number;
}

export class PagedApiResponse extends BaseApiResponse implements IPagedApiResponse {
	private _currentPage: number;
	private _totalPages: number;
	get currentPage() { return this._currentPage; }
	get totalPages() { return this._totalPages; }

	constructor(status: HTTP_STATUS, result: IPagedResult) {
		super(status, result.results);
		this._currentPage = result.currentPage;
		this._totalPages = result.totalPages;
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