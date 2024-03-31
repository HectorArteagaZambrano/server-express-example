
import { DTO } from './dto.interface'
import { UserProperties } from '../../../../domain/types/user-properties.type';

interface UserDTO {
    name: string
    lastname: string
    guid: string
    password: string
}

export type UserDeleteDTO = UserDTO


export class UserDeleteMapping extends DTO<UserProperties, UserDeleteDTO> {
    execute(user: UserProperties): UserDTO {

        return {
            name: user.name,
            lastname: user.lastname,
            guid: user.guid,
            password: user.password
        }
        
    }
}