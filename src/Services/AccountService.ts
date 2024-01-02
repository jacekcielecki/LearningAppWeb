import { CreateUserRequest } from "../Models/Account/CreateUserRequest";
import { LoginDto } from "../Models/Account/LoginDto";
import config from "../config";
import Http from "./Http";

export async function login(body: LoginDto) : Promise<boolean> {
    const http = new Http();
    const accessToken = await http.postAndGet<LoginDto, string>(`${config.apiUrl}/Account/login`, body);
    if (accessToken !== "") {
        localStorage.setItem("token", accessToken);
        return true;
    }
    return false;
}

export async function register(body: CreateUserRequest): Promise<boolean> {
    const http = new Http();
    const response = await http.post<CreateUserRequest>(`${config.apiUrl}/Account/register`, body);
    return response;
}