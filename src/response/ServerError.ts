import { BaseApiResponse } from '../entity';
import { HTTP_STATUS } from '.';

export class ServerErrorResponse extends BaseApiResponse {
	constructor() {
		super(HTTP_STATUS.serverError, 'Internal Server Error');
	}
}
