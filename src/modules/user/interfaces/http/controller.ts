import { NextFunction, Request, Response } from 'express';
import UserApplication from '../../application/user.application';
import { UserListDTO, UserListMapping } from './dto/response/user-list.dto';
import { UserListOneDTOMapping } from './dto/response/user-list-one.dto';
import UserFactory from '../../domain/user.factory';
import { EmailVO } from '../../domain/value-objects/email.vo';
import { UserInsertMapping } from './dto/response/user-insert.interface';
import { IError } from '../helpers/ierror';
import { GuidVO } from '../../domain/value-objects/guid.vo';
import { UserUpdateMapping } from './dto/response/user-update.dto';
import { UserDeleteMapping } from './dto/response/user-delete.dto';
import { UserResult } from '../../domain/types/user-result.type';

export default class {

    constructor(private readonly application: UserApplication) {
        this.listUsers = this.listUsers.bind(this)
        this.listOneUser = this.listOneUser.bind(this)
        this.insertUser = this.insertUser.bind(this)
        this.updateUser = this.updateUser.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
    }

    async listUsers(req: Request, res: Response): Promise<void> {
        const listUsers = await this.application.listUsers()
        const result: UserListDTO = new UserListMapping().execute(listUsers.map(user => user.properties()))
        res.json(result)
    }

    async listOneUser(req: Request, res: Response, next: NextFunction) {

        const { guid } = req.params

        const guildValidation = GuidVO.create(guid)

        if (guildValidation.isErr()) {
            const err: IError = new Error(guildValidation.error.message)
            err.status = 411
            return next(err)
        }

        const userResult = await this.application.listOne(guid)

        if (userResult.isErr()) {
            return res.status(400).send(userResult.error.message)
        }

        if (userResult.isOk()) {

            const result = new UserListOneDTOMapping().execute(userResult.value.properties())
            res.json(result)

        }

    }

    async insertUser(req: Request, res: Response, next: NextFunction): Promise<void> {

        const { name, lastname, email, password } = req.body
        const emailResult = EmailVO.create(email)

        if (emailResult.isErr()) {
            const err: IError = new Error(emailResult.error.message)
            err.status = 411
            return next(err)
        }

        const usersResults: UserResult = await new UserFactory().create(name, lastname, emailResult.value, password)

        if (usersResults.isErr()) {
            const err: IError = new Error(usersResults.error.message)
            err.status = 411
            return next(err)
        }

        const data = await this.application.insertUser(usersResults.value)
        const result = new UserInsertMapping().execute(data.properties())
        res.json(result)

    }

    async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {

        const { guid } = req.params
        const fieldsToUpdate = req.body

        const guildValidation = GuidVO.create(guid)

        if (guildValidation.isErr()) {
            const err: IError = new Error(guildValidation.error.message)
            err.status = 411
            return next(err)
        }

        const dataResult = await this.application.updateUser(guid, fieldsToUpdate)

        if (dataResult.isErr()) {
            const err: IError = new Error(dataResult.error.message)
            err.status = 411
            return next(err)
        }

        const result = new UserUpdateMapping().execute(dataResult.value.properties())
        res.json(result)

    }

    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {

        const { guid } = req.params

        const guildValidation = GuidVO.create(guid)

        if (guildValidation.isErr()) {
            const err: IError = new Error(guildValidation.error.message)
            err.status = 411
            return next(err)
        }

        const dataResult = await this.application.deleteUser(guid)

        if (dataResult.isErr()) {
            const err: IError = new Error(dataResult.error.message)
            err.status = 404
            return next(err)
        }

        const result = new UserDeleteMapping().execute(dataResult.value.properties())
        res.json(result)

    }

}