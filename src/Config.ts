import jwt from 'jsonwebtoken';
import { Levels } from '@lreading/typescript-winston-logger';

export class TsFrameworkConfig {
	jwtSecretOrToken: jwt.Secret;
	jwtVerificationOptions: jwt.VerifyOptions;

	logLevel: Levels;
	logMaxFileSize: number;
	logSilent: boolean;
}

let _config: TsFrameworkConfig = null;

export const getTsFrameworkConfig = () => {
	if (_config === null) {
		_config = new TsFrameworkConfig();
	}
	return _config;
};
