import { v4 as uuidv4 } from 'uuid'
import { err, ok } from 'neverthrow';

import { UserPasswordService } from './services/user-password.service'
import User from './user'
import { EmailVO } from './value-objects/email.vo'
import {
    UserLastNameRequiredException,
    UserNameRequiredException,
    UserPasswordRequiredException,
    UserPasswordLengthInvalidException
} from './exceptions/user.exception'
import { UserResult } from './types/user-result.type';
import { UserProperties } from './types/user-properties.type';

export default class UserFactory {

    async create(
        name: string,
        lastname: string,
        email: EmailVO,
        password: string
    ): Promise<UserResult> {

        if (!name || name.trim() === '') {
            return err(new UserNameRequiredException())
        }

        if (!lastname || lastname.trim() === '') {
            return err(new UserLastNameRequiredException())
        }

        if (!password || password.trim() === '') {
            return err(new UserPasswordRequiredException())
        }

        if (password.length < 5) {
            return err(new UserPasswordLengthInvalidException(password))
        }

        const passwordHash = await UserPasswordService.hash(password)

        const userProperties: UserProperties = {
            name,
            lastname,
            email,
            password: passwordHash,
            guid: uuidv4(),
            refreshToken: uuidv4()
        }

        const user = new User(userProperties)

        return ok(user)

    }

}