import { createContext } from 'react';
import { UserDto } from '../Models/User/UserDto';

interface UserContextType {
    user: UserDto | null;
    setUser: (user: UserDto) => void;
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: (user: UserDto) => {}
});

export default UserContext;