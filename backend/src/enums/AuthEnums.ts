export enum AuthEvent {
    REGISTRATION = 'registraition',
    LOGIN = 'login',
    RESET = 'reset',
    RESET_PASSWORD = 'resetPassword',
    CONFIRMATION = "confirmation",

    GET_ROLES = "getRoles"

}

export enum AuthEmiter {
    REGISTERED = 'registered',
    LOGED = 'loged',
    RESETED = 'reseted',
    CONFIRMED = "confirmed",
    PASSWORD_RESETED = 'passwordReseted',
    INAVLID_TOKEN = "invalidToken",

    GET_ROLES = "getRoles"
}


export enum AuthError{
    REGISTARTION_EMPTY_COLUMN = 'Not all fields are filled in',
    REGISTRATION_ALREADY_IN_USE = "Username or E-Mail  already in use",

    LOGIN_IDENTITY_NOT_FOUND = "Identity not found",
    LOGIN_PASSWORD_INCORRECT = "Password is incorrect",

    CONFIRM_INCORRECT_CODE = "Incorrect code",
    CONFIRM_INVALID_FORM = "Invalid form",

    RESET_PASSWORD_INVALID_FORM = "Invalid form",
    RESET_PASSWORD_PASSWORDS_DIFFERENT = "Password are different",

    INVALID_TOKEN = "Invalid auth-token. Re-Auth please"

}
