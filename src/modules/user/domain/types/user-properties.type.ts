import { UserOptional, UserRequired } from '../interfaces/user.interface';

export type UserProperties = Required<UserRequired> & Partial<UserOptional>;
