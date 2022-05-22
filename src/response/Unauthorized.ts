import { BaseApiResponse } from '../entity';
import { HTTP_STATUS } from '.';

export class UnauthorizedResponse extends BaseApiResponse {
	constructor() {
		super(HTTP_STATUS.unauthorized, 'Unauthorized');
	}
}
