import { IsNotEmpty, IsString, MinLength, IsUUID } from 'class-validator'

export class UserListOneValidator {

    @IsUUID(4, { message: 'Guid must be a UUID' })
    @IsString({ message: 'Guid must be a string' })
    @IsNotEmpty({ message: 'Guild must no be empty' })
    @MinLength(10, { message: 'Guid too short' })
    guid: string

}