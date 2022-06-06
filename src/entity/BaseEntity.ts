import { validateOrReject } from 'class-validator';

import { IEntity } from './';

export abstract class BaseEntity implements IEntity<number> {
	id: number;
	async getValidationErrors(): Promise<string> {
		try {
			await validateOrReject(this);
			return '';
		} catch (ex) {
			return (ex as Array<string>).join(' ');
		}
	}
}