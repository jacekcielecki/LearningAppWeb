import { LoginDto } from "../Models/Account/LoginDto";
import config from "../config";

export async function Login(dto: LoginDto) {
    try {
        const response = await fetch(`${config.apiUrl}/Account/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dto),
        });
        const data: string = await response.text();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}