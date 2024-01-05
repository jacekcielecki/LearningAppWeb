import { UserDto } from "../Models/User/UserDto";
import config from "../config";
import Http from "./Http";

export async function getUsers(): Promise<UserDto[]> {
    const http = new Http();
    const response = await http.get<UserDto[]>(`${config.apiUrl}/User`);
    return response;
  }

  export async function getUser(id: number): Promise<UserDto> {
    const http = new Http();
    const response = await http.get<UserDto>(`${config.apiUrl}/User/${id}`);
    return response;
  }