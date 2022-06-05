import { DataSource, DataSourceOptions } from 'typeorm';
import { getLogger, TSLogger } from '@lreading/typescript-winston-logger';

class DatabaseManager {
    private readonly logger: TSLogger;
    
    private _connection: DataSource;
    get connection(): DataSource {
        return this._connection;
    }

    constructor() {
        this.logger = getLogger('repo/ConnectionManager.ts');
    }

    async initialize(options: DataSourceOptions): Promise<void> {
        this.logger.info('Initializing database...');
        this._connection = new DataSource(options);
        await this._connection.initialize();
        this.logger.info('Done initializing database');
    }
}

export const dbManager = new DatabaseManager();
