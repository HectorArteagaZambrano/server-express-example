
import { DTO } from './dto.interface'
import { UserProperties } from '../../../../domain/types/user-properties.type';

interface UserDTO {
    name: string
    lastname: string
    email: string
    guid: string
}

export type UserInsertOneDTO = UserDTO

export class UserInsertMapping extends DTO<UserProperties, UserInsertOneDTO> {
    execute(data: UserProperties): UserInsertOneDTO {
        return {
            name: data.name,
            lastname: data.lastname,
            email: data.email.value,
            guid: data.guid
        }
    }
}