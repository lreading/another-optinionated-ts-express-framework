import { Express, Request, Response, NextFunction } from 'express';
import { TSLogger } from '@lreading/typescript-winston-logger';

import { authMiddleware } from '../middleware';
import { Route } from '.';

export const Controller = (prefix = ''): ClassDecorator => {
	return (target: any) => {
		Reflect.defineMetadata('prefix', prefix, target);
	};
};

export const registerControllers = (app: Express, logger: TSLogger, controllers: any[]): void => {
	controllers.forEach((controller) => registerController(app, logger, controller));
};

export const registerController = (app: Express, logger: TSLogger, controller: any): void => {
	const instance = new controller();
	const prefix = Reflect.getMetadata('prefix', controller);
	const routes: Array<Route> = Reflect.getMetadata('routes', controller);
	const passThrough = (req: Request, res: Response, next: NextFunction) => next();

	routes.forEach((route) => {
		logger.info(`Registered ${route.method.toUpperCase()} - ${prefix + route.path}`);
		app[route.method](
			prefix + route.path,
			route.allowAnonymous ? passThrough : authMiddleware,
			(req: Request, res: Response) => route.implementation(req, res, instance)
		);
	});
};