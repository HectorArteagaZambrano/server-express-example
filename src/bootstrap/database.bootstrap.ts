import { Bootstrap } from './base.bootstrap';
import { DataSource } from 'typeorm';
import { AppService } from './services/app.service';
import { DB_CONFIG } from './interfaces/db-config.interface';

let appDataSource: DataSource

export default class DatabaseBootstrap extends Bootstrap {

    initialize(): Promise<DataSource> {

        const dbConfig: DB_CONFIG = AppService.DBConfig

        const AppDataSource = new DataSource({
            type: 'mysql',
            ...dbConfig
        })

        appDataSource = AppDataSource

        return appDataSource.initialize()

    }

    static get dataSource(): DataSource {

        return appDataSource

    }


}