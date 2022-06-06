export interface IPagedResult {
    results: unknown[];
    currentPage: number;
    totalPages: number;
}

export class PagedResult implements IPagedResult {
	results: unknown[];
	currentPage: number;
	totalPages: number;
}
