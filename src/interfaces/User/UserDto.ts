import RoleDto from "./RoleDto";

interface UserDto {
    id: number;
    username: string;
    emailAddress: string;
    profilePictureUrl: string;
    isVerified: boolean;
    role: RoleDto;
}

export default UserDto;