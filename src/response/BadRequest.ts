import { BaseApiResponse } from '../entity';
import { HTTP_STATUS } from '.';

export class BadRequestResponse extends BaseApiResponse {
	constructor(errorMessage?: string) {
		super(HTTP_STATUS.badRequest, errorMessage || 'Bad Request');
	}
}
