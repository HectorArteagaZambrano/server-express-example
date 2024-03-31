
import { DTO } from './dto.interface'
import { UserProperties } from '../../../../domain/types/user-properties.type';

interface UserDTO {
    name: string
    lastname: string
    email: string
    guid: string
}

export type UserListOneDTO = UserDTO

export class UserListOneDTOMapping extends DTO<UserProperties, UserDTO> {
    execute(data: UserProperties): UserListOneDTO {
        return {
            name: data.name,
            lastname: data.lastname,
            email: data.email.value,
            guid: data.guid
        }
    }
}
