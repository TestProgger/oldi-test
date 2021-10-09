export enum AuthEvent {
    REGISTRATION = 'registraition',
    LOGIN = 'login',
    RESET = 'reset'
}

export enum AuthEmiter {
    REGISTERED = 'registered',
    LOGED = 'loged',
    RESETED = 'reseted'
}


export enum AuthError{
    REGISTARTION_EMPTY_COLUMN = 'Not all fields are filled in',
    REGISTRATION_ALREADY_IN_USE = "Username or E-Mail  already in use",

    LOGIN_IDENTITY_NOT_FOUND = "Identity not found",
    LOGIN_PASSWORD_INCORRECT = "Password is incorrect"
}
