export interface UserResponseDto {
  avatar: string;
  email: string;
  id: string;
  name: string;
  roles: {
    isAuthor: boolean;
    isCoauthor: boolean;
    isTeacher: boolean;
  };
}
