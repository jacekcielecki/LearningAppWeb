import { UserDto } from "../Models/User/UserDto";
import http from "./Http";

const UserService = {
  GetAll: () => {
    return http.get<UserDto[]>(`/User`);
  },
  GetById: (id : number) => {
    return http.get<UserDto>(`/User/${id}`);
  }
};

export default UserService;