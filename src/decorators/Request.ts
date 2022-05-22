import 'reflect-metadata';

import { getLogger } from '@lreading/typescript-winston-logger';
import { Request, Response } from 'express';

import { BaseApiResponse } from '../entity';
import { BaseApiError } from '../errors';
import { AcceptedResponse, CreatedResponse, NotFoundResponse, OkResponse, ServerErrorResponse } from '../response';
import { Method, Route } from '.';

const logger = getLogger('decorators/Request.ts');

const getResponseWrapper = (verb: string, body: unknown): BaseApiResponse => {
	if (body === null) {
		return new NotFoundResponse();
	}

	switch (verb.toLowerCase()) {
	case 'post':
		return new CreatedResponse(body);
	case 'put':
		return new AcceptedResponse(body);
	default:
		return new OkResponse(body);
	}
};

export const RequestDecorator = (path: string, method: Method): MethodDecorator => {

	return function (target: unknown, propertyKey: string) {
		const implementation = async (req: Request, res: Response, instance: any) => {
			try {
				const original = await instance[propertyKey](req, res);
				return getResponseWrapper(req.method, original).toResponse(res);
			} catch (err) {
				if (err instanceof BaseApiError) {
					err.logMessage(logger);
					return (err as BaseApiError).toResponse(res);
				} else {
					logger.error('Unhandled error:');
					logger.error(err);
					return new ServerErrorResponse().toResponse(res);
				}
			}
		};

		if (!Reflect.hasMetadata('routes', target.constructor)) {
			Reflect.defineMetadata('routes', [], target.constructor);
		}

		if (!Reflect.hasMetadata('prefix', target.constructor)) {
			Reflect.defineMetadata('prefix', '', target.constructor);
		}

		const routes = Reflect.getMetadata('routes', target.constructor) as Array<Route>;
		const allowAnonymous = Reflect.getMetadata('allowAnonymous', target) as boolean;
		routes.push({
			path,
			method,
			implementation,
			allowAnonymous
		});
		Reflect.defineMetadata('routes', routes, target.constructor);
	};
};
