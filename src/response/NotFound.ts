import { BaseApiResponse } from '../entity';
import { HTTP_STATUS } from '.';

export class NotFoundResponse extends BaseApiResponse {
	constructor() {
		super(HTTP_STATUS.notFound, 'Resource Not Found');
	}
}
