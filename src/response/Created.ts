import { BaseApiResponse } from '../entity';
import { HTTP_STATUS } from '.';

export class CreatedResponse extends BaseApiResponse {
	constructor(body: unknown) {
		super(HTTP_STATUS.created, body);
	}
}
