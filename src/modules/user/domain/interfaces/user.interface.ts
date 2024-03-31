import { EmailVO } from '../value-objects/email.vo';

export interface UserRequired {
    name: string;
    lastname: string;
    email: EmailVO;
    password: string;
}

export interface UserOptional {
    refreshToken: string;
    active: boolean;
    guid: string;
}

export type UserUpdate = {
    name: string;
    lastname: string;
    email: EmailVO;
    password: string;
}
