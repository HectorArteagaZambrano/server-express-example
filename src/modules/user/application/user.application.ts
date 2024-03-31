import { Result } from 'neverthrow';
import User from '../domain/user';
import { UserRepository } from '../domain/user.repository';
import { UserEmailInvalidException, UserNotFoundException } from '../domain/exceptions/user.exception';
import { UserUpdate } from '../domain/interfaces/user.interface';

export default class UserApplication {

    constructor(private readonly userRepository: UserRepository) { }

    public async listUsers(): Promise<User[]> {
        return await this.userRepository.list()
    }

    public async listOne(guid: string): Promise<Result<User, UserNotFoundException | UserEmailInvalidException>> {
        return await this.userRepository.listOne(guid)
    }

    public async insertUser(user: User): Promise<User> {
        return await this.userRepository.insert(user)
    }

    public async updateUser(guid: string, user: UserUpdate): Promise<Result<User, UserNotFoundException | UserEmailInvalidException>> {
        return await this.userRepository.update(guid, user)
    }

    public async deleteUser(guid: string): Promise<Result<User, UserNotFoundException | UserEmailInvalidException>> {
        return await this.userRepository.delete(guid)
    }
}