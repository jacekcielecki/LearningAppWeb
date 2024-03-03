import RoleDto from "./RoleDto";

export interface UserDto {
    id: number;
    username: string;
    emailAddress: string;
    profilePictureUrl: string;
    isVerified: boolean;
    role: RoleDto;
}

export default UserDto;