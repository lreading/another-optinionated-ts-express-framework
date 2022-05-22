import { BaseApiResponse } from '../entity';
import { HTTP_STATUS } from '.';

export class AcceptedResponse extends BaseApiResponse {
	constructor(body: unknown) {
		super(HTTP_STATUS.accepted, body);
	}
}
