import { Result } from 'neverthrow';
import User from './user';
import { UserEmailInvalidException, UserNotFoundException } from './exceptions/user.exception';
import { UserUpdate } from './interfaces/user.interface';

    export interface UserRepository {
        list(): Promise<User[]>
        listOne(guid: string): Promise<Result<User, UserNotFoundException | UserEmailInvalidException>>
        insert(user: User): Promise<User>
        update(guid: string, user: Partial<UserUpdate>): Promise<Result<User, UserNotFoundException | UserEmailInvalidException>>
        delete(guid: string): Promise<Result<User, UserNotFoundException | UserEmailInvalidException>>
    }