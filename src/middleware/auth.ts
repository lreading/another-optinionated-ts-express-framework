import { getLogger } from '@lreading/typescript-winston-logger';
import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';

import { getTsFrameworkConfig } from '../Config';
import { IAuthedRequest } from '../entity';
import { UnauthorizedResponse } from '../response';

const config = getTsFrameworkConfig();
const logger = getLogger('middleware/auth.ts');

const parseBearerToken = (header: string | null): string | null => {
	if (!header || !header.toLowerCase().startsWith('bearer') || header.indexOf(' ') === -1) {
		return null;
	}

	return header.split(' ')[1];
};

export const authMiddleware = async (req: IAuthedRequest, res: Response, next: NextFunction) => {
	const token = parseBearerToken(req.headers.authorization);
	if (!token) return new UnauthorizedResponse().toResponse(res);

	try {
		jwt.verify(token, config.jwtSecretOrToken, config.jwtVerificationOptions);
		const decoded = jwt.decode(token) as jwt.JwtPayload;
		req.user = {
			id: decoded.sub
		};
	} catch (err) {
		logger.audit('Error decoding JWT');
		logger.audit(jwt);
		return new UnauthorizedResponse().toResponse(res);
	}

	next();
};
