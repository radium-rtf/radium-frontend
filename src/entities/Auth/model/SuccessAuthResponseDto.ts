export interface SuccessAuthResponseDto {
  accessToken: string;
  expiresIn: string;
  refreshToken: string;
  user: {
    avatar: string;
    email: string;
    id: string;
    isTeacher: boolean;
    name: string;
  };
}
