export interface CreateUserRequest{
    username: string,
    password: string,
    confirmPassword: string,
    emailAddress: string,
    profilePictureUrl: string | null
}