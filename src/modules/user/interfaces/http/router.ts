import { Router } from 'express'
import UserApplication from '../../application/user.application'
import { UserRepository } from '../../domain/user.repository'
import UserInfraestructure from '../../infraestructure/user.infraestructure'
import UserController from './controller'
import { MiddlewareListOne } from './middlewares/user.middleware'

const infraestructure: UserRepository = new UserInfraestructure()
const application = new UserApplication(infraestructure);
const controller = new UserController(application);

class UserRouter {

    readonly expressRouter: Router

    constructor() {
        this.expressRouter = Router()
        this.mounthRoutes()
    }

    mounthRoutes(): void {

        this.expressRouter.get('/', controller.listUsers)
        this.expressRouter.get('/:guid', ...MiddlewareListOne, controller.listOneUser)
        this.expressRouter.post('/', controller.insertUser)
        this.expressRouter.put('/:guid', controller.updateUser)
        this.expressRouter.delete('/:guid', controller.deleteUser)

    }

}

export default new UserRouter().expressRouter