import ServerBootstrap from './bootstrap/server.bootstrap'
import DatabaseBootstrap from './bootstrap/database.bootstrap'
import Application from './app';
import { Bootstrap } from './bootstrap/base.bootstrap';
import { AppService } from './bootstrap/services/app.service';

const serverBootstrap: Bootstrap = new ServerBootstrap(Application)
const databaseBootstrap: Bootstrap = new DatabaseBootstrap()

    ; (async () => {
        try {
            await databaseBootstrap.initialize()
            await serverBootstrap.initialize()
            console.log(`Server listering on port: ${AppService.PORT}`)
        } catch (error) {
            console.log(error)
        }
    })()