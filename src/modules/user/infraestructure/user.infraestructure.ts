import { Repository } from 'typeorm';
import { Result, err, ok } from 'neverthrow';
import User from '../domain/user';
import { UserRepository } from '../domain/user.repository';
import { UserEntity } from './user.entity';
import DatabaseBootstrap from '../../../bootstrap/database.bootstrap';
import { EmailVO } from '../domain/value-objects/email.vo';
import { UserEmailInvalidException, UserNotFoundException } from '../domain/exceptions/user.exception';
import { UserUpdate } from '../domain/interfaces/user.interface';


export default class UserInfraestructure implements UserRepository {

    async list(): Promise<User[]> {

        const repositoryUserEntity: Repository<UserEntity> = DatabaseBootstrap.dataSource.getRepository(UserEntity)
        const resultFindUsers: UserEntity[] = await repositoryUserEntity.find({ where: { active: true } })

        return resultFindUsers.map((user: UserEntity) => {

            const emailUserValidate = EmailVO.create(user.email)

            if (emailUserValidate.isErr()) {
                throw new UserEmailInvalidException()
            }

            return new User({
                guid: user.guid,
                name: user.name,
                lastname: user.lastname,
                email: emailUserValidate.value,
                password: user.password,
                refreshToken: user.refreshToken,
                active: user.active
            })

        })

    }

    async listOne(guid: string): Promise<Result<User, UserNotFoundException | UserEmailInvalidException>> {

        const repositoryUserEntity: Repository<UserEntity> = DatabaseBootstrap.dataSource.getRepository(UserEntity)
        const resultFindUser: UserEntity = await repositoryUserEntity.findOne({ where: { guid } })

        const emailUserValidate = EmailVO.create(resultFindUser.email)

        if (emailUserValidate.isErr()) {
            return err(new UserEmailInvalidException())
        }

        if (!resultFindUser) {
            return err(new UserNotFoundException())
        }

        return ok(new User({
            guid: resultFindUser.guid,
            name: resultFindUser.name,
            lastname: resultFindUser.lastname,
            email: emailUserValidate.value,
            password: resultFindUser.password,
            refreshToken: resultFindUser.refreshToken,
            active: resultFindUser.active
        }))

    }

    async insert(user: User): Promise<User> {

        const userInsert = new UserEntity()

        //const { guid, name, lastname, email, password, refreshToken, active } = user.properties()
        const { guid, name, lastname, email, password, active } = user.properties()

        Object.assign(userInsert, {
            guid,
            name,
            lastname,
            email: email.value,
            password,
            refreshToken: password,
            active
        })

        await DatabaseBootstrap.dataSource.getRepository(UserEntity).save(userInsert)

        return user

    }

    async update(guid: string, user: Partial<UserUpdate>): Promise<Result<User, UserNotFoundException>> {

        const repositoryUserEntity: Repository<UserEntity> = DatabaseBootstrap.dataSource.getRepository(UserEntity)
        const userFound: UserEntity = await repositoryUserEntity.findOne({ where: { guid } })

        if (!userFound) {
            return err(new UserNotFoundException())
        }

        Object.assign(userFound, user)
        const userEntity = await repositoryUserEntity.save(userFound)
        const emailUserValidate = EmailVO.create(userEntity.email)

        if (emailUserValidate.isErr()) {
            return err(new UserEmailInvalidException())
        }

        return ok(new User({
            guid: userEntity.guid,
            name: userEntity.name,
            lastname: userEntity.lastname,
            email: emailUserValidate.value,
            password: userEntity.password,
            refreshToken: userEntity.refreshToken,
            active: userEntity.active
        }))

    }

    async delete(guid: string): Promise<Result<User, UserNotFoundException>> {

        const repositoryUserEntity: Repository<UserEntity> = DatabaseBootstrap.dataSource.getRepository(UserEntity)
        const userFound: UserEntity = await repositoryUserEntity.findOne({ where: { guid } })

        if (!userFound) {return err(new UserNotFoundException())}

        userFound.active = false
        const userEntity = await repositoryUserEntity.save(userFound)

        const emailUserValidate = EmailVO.create(userEntity.email)

        if (emailUserValidate.isErr()) {return err(new UserEmailInvalidException())}
        
        return ok(new User({
            guid: userEntity.guid,
            name: userEntity.name,
            lastname: userEntity.lastname,
            email: emailUserValidate.value,
            password: userEntity.password,
            refreshToken: userEntity.refreshToken,
            active: userEntity.active
        }))

    }
}