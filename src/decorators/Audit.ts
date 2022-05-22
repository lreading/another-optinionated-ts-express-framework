import { getLogger } from '@lreading/typescript-winston-logger';

import { IAuthedRequest } from '../entity';

const logger = getLogger('decorators/Audit.ts');

export const Audit = (): MethodDecorator => {
	return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
		const original = descriptor.value;

		descriptor.value = function (...args: any[]) {
			const request = args[0] as IAuthedRequest;
			const { url, method, user } = request;
            
			const username = user  && user.id ? user.id : '(unknown?)';
			const msg = `${method.toUpperCase()}: ${url} by user ${username}`;
			logger.audit(msg);
            
			return original.apply(this, args);
		};
	};
};
