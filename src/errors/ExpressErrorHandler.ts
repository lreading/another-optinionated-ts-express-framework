import { getLogger, TSLogger } from '@lreading/typescript-winston-logger';
import { NextFunction, Request, Response } from 'express';

export class ExpressErrorHandler {
	private static readonly logger: TSLogger = getLogger('errors/ExpressErrorHandler.ts');
	catchAll(err: Error, req: Request, res: Response): Response {
		ExpressErrorHandler.logger.error(err);
		return res.status(500)
			.json({
				status: 500,
				body: 'InternalServerError'
			});
	}

	notFound(req: Request, res: Response, next: NextFunction): Response {
		if (!res.headersSent) {
			ExpressErrorHandler.logger.info(`Returning 404 for ${req.path}`);
			return res.status(404)
				.json({
					status: 404,
					body: 'Resource Not Found'
				});
		}
		next();
	}
}
