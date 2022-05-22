import { BaseApiResponse } from '../entity';
import { HTTP_STATUS } from '.';

export class OkResponse extends BaseApiResponse {
	constructor(body: unknown) {
		super(HTTP_STATUS.ok, body);
	}
}
