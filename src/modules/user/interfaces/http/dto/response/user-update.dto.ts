import { UserProperties } from 'src/modules/user/domain/types/user-properties.type'
import { DTO } from './dto.interface'

interface UserDTO {
    name: string
    lastname: string
    guid: string
    password: string
}

export type UserUpdateDTO = UserDTO

export class UserUpdateMapping extends DTO<UserProperties, UserUpdateDTO> {
    execute(user: UserProperties): UserUpdateDTO {

        return {
            name: user.name,
            lastname: user.lastname,
            guid: user.guid,
            password: user.password
        }

    }
}