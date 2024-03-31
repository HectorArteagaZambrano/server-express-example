import { DomainExceptionCode } from '../enums/domain-exception.enum'
import { DomainException } from './domain.exception'

export class UserNameRequiredException extends DomainException {

    constructor() {
        super(UserNameRequiredException.getMessage())
        this.name = DomainExceptionCode.USER_NAME_REQUIRED
    }

    static getMessage(): string {
        return 'Name is required'
    }

}

export class UserLastNameRequiredException extends DomainException {

    constructor() {
        super(UserLastNameRequiredException.getMessage())
        this.name = DomainExceptionCode.USER_LASTNAME_REQUIRED
    }

    static getMessage(): string {
        return 'LastName is required'
    }

}

export class UserEmailRequiredException extends DomainException {

    constructor() {
        super(UserEmailRequiredException.getMessage())
        this.name = DomainExceptionCode.USER_EMAIL_REQUIRED
    }

    static getMessage(): string {
        return 'Email is required'
    }

}

export class UserEmailInvalidException extends DomainException {

    constructor() {
        super(UserEmailInvalidException.getMessage())
        this.name = DomainExceptionCode.USER_EMAIL_INVALID
    }

    static getMessage(): string {
        return 'Email is invalid'
    }

}

export class UserPasswordRequiredException extends DomainException {

    constructor() {
        super(UserPasswordRequiredException.getMessage())
        this.name = DomainExceptionCode.USER_PASSWORD_REQUIRED
    }

    static getMessage(): string {
        return 'Password is required'
    }

}

export class UserPasswordLengthInvalidException extends DomainException {

    constructor(password: string) {
        super(UserPasswordLengthInvalidException.getMessage(password))
        this.name = DomainExceptionCode.USER_PASSWORD_LENGTH_INVALID
    }

    static getMessage(password: string): string {
        return `Password must be more than 4 character, but '${password}' has only ${password.length}`
    }

}

export class UserGuidInvalidException extends DomainException {

    constructor() {
        super(UserGuidInvalidException.getMessage())
        this.name = DomainExceptionCode.USER_GUID_INVALID
    }

    static getMessage(): string {
        return 'Guid is invalid'
    }

}

export class UserNotFoundException extends DomainException {

    constructor() {
        super(UserNotFoundException.getMessage())
        this.name = DomainExceptionCode.USER_NOT_FOUND
    }

    static getMessage(): string {
        return 'User no found'
    }

}


