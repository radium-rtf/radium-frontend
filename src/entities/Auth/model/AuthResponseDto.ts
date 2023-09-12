import { SuccessAuthResponseDto } from '@/entities/Auth';
import { ErrorAuthResponseDto } from '@/entities/Auth';

export type AuthResponseDto = SuccessAuthResponseDto | ErrorAuthResponseDto;
