import { CreateUserRequest } from "../Models/Account/CreateUserRequest";
import { LoginDto } from "../Models/Account/LoginDto";
import config from "../config";

export async function login(dto: LoginDto) : Promise<string> {
    try {
        const response = await fetch(`${config.apiUrl}/Account/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dto),
        });
        const data: string = await response.text();
        return data;
    } catch (error) {
        console.error(error);
        return "";
    }
}

export async function register(request: CreateUserRequest): Promise<boolean> {
    try {
        const response = await fetch(`${config.apiUrl}/Account/register`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request)
        });
        if (!response.ok) {
            throw new Error('Failed to register new account');
          }
        return true;
    } catch (error) {
        console.error(error)
        return false;
    }
}