import { CreateUserRequest } from "../Models/Account/CreateUserRequest";
import { LoginDto } from "../Models/Account/LoginDto";
import config from "../config";
import Http from "./Http";

const AccountService = {
    async Login(body: LoginDto) : Promise<boolean> {
        try {
            const response = await fetch(`${config.apiUrl}/Account/login`,  {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                throw new Error(`Error to POST data from ${`${config.apiUrl}/Account/login`} with statusCode ${response.status}`);
            }
            const accessToken: string = await response.text();
            if (accessToken !== "") {
                localStorage.setItem("token", accessToken);
                return true;
            }
            return false;
        } catch (error : any) {
            console.error(error);
            throw error;
        }
    },
    async Register(body: CreateUserRequest): Promise<boolean> {
        const response = await Http.post<CreateUserRequest>(`${config.apiUrl}/Account/register`, body);
        return response;
    }
};

export default AccountService;