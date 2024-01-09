import { createContext } from 'react';
import { UserDto } from '../Models/User/UserDto';

const UserContext = createContext<UserDto | null>(null);

export default UserContext;