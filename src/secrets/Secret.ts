import fs from 'fs';
import { getLogger, TSLogger } from '@lreading/typescript-winston-logger';

import { SecretType } from './SecretType';

export interface ISecret {
    load(type: SecretType): Promise<unknown>;
}


export class Secret implements ISecret {
	private readonly name: string;
	private readonly defaultVal: unknown = null;
	private readonly required: boolean;
	private readonly logger: TSLogger;
    
	constructor(name: string, defaultVal?: unknown, required = false) {
		this.name = name;
		this.defaultVal = defaultVal || null;
		this.required = required;
		this.logger = getLogger('secrets/Secret.ts');
	}
    
	private fromProcess(): string | null {
		return process.env[this.name] || null;
	}
    
	private fromDockerSecret(): string | null {
		const secretPath = `/run/secrets/${this.name}`;
		if (fs.existsSync(secretPath)) {
			return fs.readFileSync(secretPath).toString('utf8').trim();
		}
		return null;
	}
    
	private toType(type: SecretType, val: any): unknown {
		if (type === SecretType.int) {
			return parseInt(val, 10);
		}
        
		if (type === SecretType.boolean) {
			return val === 'true';
		}
        
		if (type === SecretType.json) {
			return JSON.parse(val);
		}
        
		// Only string left
		return val.toString('utf8');
	}
    
	async load(type: SecretType): Promise<unknown> {
		this.logger.debug(`Loading secret ${this.name}`);

		let strVal = this.fromDockerSecret();
		if (strVal === null) {
			strVal = this.fromProcess();
		}
    
		if (strVal !== null) {
			return this.toType(type, strVal);
		}
    
		const secret = this.defaultVal || null;
    
		if (!secret && this.required) {
			throw new TypeError(`${this.name} is a required property but none was found`);
		}
    
		return secret;
	}
}
