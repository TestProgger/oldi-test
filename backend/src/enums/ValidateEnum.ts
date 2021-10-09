export enum ValidateEmit{
    EMAIL_VALIDATED = 'emailValidated',
    PASSWORD_VALIDATED = 'passwordValidated',
    USERNAME_VALIDATED = 'usernameValidated'
}

export enum ValidateEvent{
    VALIDATE_EMAIL = 'validateEmail',
    VALIDATE_PASSWORD = 'validatePassword',
    VALIDATE_USERNAME = 'validateUsername'
}

export enum ValidateError{
    
    INVALID_EMAIL = 'Invalid Email',
    EMAIL_ALREADY_USE = "E-Mail already in use",

    INVALID_USERNAME = "Invalid Username",
    USERNAME_ALREADY_USE = "Username already in use",

    INVALID_PASSWORD = "Invalid Password",
    PASSWORDS_DIFFERENT = "Password are different",
    SHORT_PASSWORD = "Password is to short",
    WEAK_PASSOWRD = "Password is weak"

}