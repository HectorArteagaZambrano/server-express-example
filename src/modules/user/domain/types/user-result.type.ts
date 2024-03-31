import { Result } from 'neverthrow';
import User from '../user';
import {
    UserLastNameRequiredException,
    UserNameRequiredException,
    UserPasswordLengthInvalidException,
    UserPasswordRequiredException
} from '../exceptions/user.exception';

export type UserResult = Result<
    User,
    | UserNameRequiredException
    | UserLastNameRequiredException
    | UserPasswordRequiredException
    | UserPasswordLengthInvalidException>
