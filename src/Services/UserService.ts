import { UserDto } from "../Models/User/UserDto";
import config from "../config";
import Http from "./Http";

const UserService = {
  async GetAll(): Promise<UserDto[]> {
    const response = await Http.get<UserDto[]>(`${config.apiUrl}/User`);
    return response;
  },
  async GetById(id: number): Promise<UserDto> {
    const response = await Http.get<UserDto>(`${config.apiUrl}/User/${id}`);
    return response;
  }
};

export default UserService;