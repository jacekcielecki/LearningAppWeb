import { CreateUserRequest } from "../Models/Account/CreateUserRequest";
import { LoginDto } from "../Models/Account/LoginDto";
import http from "./Http";

const AccountService = {
    Register: (body: CreateUserRequest) => {
        return http.post(`/Account/register`, body);
    },
    Login: (body: LoginDto) => {
        return http.post<string>(`/Account/login`, body);
    }
};

export default AccountService;