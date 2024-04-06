export interface SuccessAuthResponseDto {
  accessToken: string;
  expiresIn: string;
  refreshToken: string;
  user: {
    avatar: string;
    email: string;
    name: string;
    id: string;
    roles: {
      isAuthor: boolean;
      isTeacher: boolean;
      isCoauthor: boolean;
    };
  };
}
