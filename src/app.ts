import express, { Application } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import hpp from 'hpp'
import compression from 'compression'

import routerUser from './modules/user/interfaces/http/router'

import routerHealth from './helpers/health.helper'
import HandleErrors from './helpers/error.helper'


class App {

    readonly expressApp: Application

    constructor() {
        this.expressApp = express()
        this.owaspSecurityMiddleware()
        this.mountHealthCheck()
        this.mountMiddlewares()
        this.mountRoutes()
        this.mountErrors()
    }

    owaspSecurityMiddleware(): void {
        this.expressApp.use(hpp())
        this.expressApp.use(helmet())
        this.expressApp.use(cors({
            origin: '*',
            optionsSuccessStatus: 200,
            methods: ['GET', 'POST', 'PUT', 'DELETE']
        }))
    }

    mountMiddlewares(): void {
        this.expressApp.use(compression())
        this.expressApp.use(express.json())
        this.expressApp.use(express.urlencoded({ extended: true }))
    }

    mountHealthCheck(): void {
        this.expressApp.use('/', routerHealth)
    }

    mountRoutes(): void {
        this.expressApp.use('/user', routerUser)
    }

    mountErrors(): void {
        this.expressApp.use(HandleErrors.notFound)
    }

}

export default new App().expressApp;

