import { UserDto } from "../Models/User/UserDto";
import config from "../config";
import Http from "./Http";

export async function getUser(): Promise<UserDto> {
    const http = new Http();
    const response = await http.get<UserDto>(`${config.apiUrl}/User`);
    return response;
  }