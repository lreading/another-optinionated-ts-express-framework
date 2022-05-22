import { BaseApiResponse } from '../entity';
import { HTTP_STATUS } from '.';

export class ForbiddenResponse extends BaseApiResponse {
	constructor() {
		super(HTTP_STATUS.forbidden, 'Forbidden');
	}
}
