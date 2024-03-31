import { UserEntity } from '../../modules/user/infraestructure/user.entity'
import { DB_CONFIG } from '../interfaces/db-config.interface'

export class AppService {

    static get PORT(): number {
        return +process.env.PORT || 300
    }

    static get DBConfig(): DB_CONFIG {
        return {
            host: process.env.DB_HOST || 'localhost',
            port: +process.env.DB_PORT || 3310,
            entities: [UserEntity],
            //entities: [process.env.DB_ENTITIES || 'src/**/*.entity.{.ts,.js}'],
            //entities: [process.env.DB_ENTITIES || 'dist/**/*.entity.{.ts,.js}'],
            username: process.env.DB_USER || 'user',
            password: process.env.DB_PASS || '123456',
            database: process.env.DB_NAME || 'course-node',
            synchronize: process.env.DB_SYNCHRONIZE === 'true' ? true : false,
            logging: process.env.DB_LOGGING === 'true' ? true : false
        }
    }

}