import { CreateUserRequest } from "../interfaces/Account/CreateUserRequest";
import { LoginDto } from "../interfaces/Account/LoginDto";
import http from "./httpg";

const AccountService = {
    Register: (body: CreateUserRequest) => {
        return http.post(`/Account/register`, body);
    },
    Login: (body: LoginDto) => {
        return http.post<string>(`/Account/login`, body);
    }
};

export default AccountService;