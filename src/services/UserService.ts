import { UserDto } from "../interfaces/User/UserDto";
import http from "./httpg";

const UserService = {
  GetAll: () => {
    return http.get<UserDto[]>(`/User`);
  },
  GetById: (id : number) => {
    return http.get<UserDto>(`/User/${id}`);
  }
};

export default UserService;