import { ErrorAuthResponseDto } from './ErrorAuthResponseDto';
import { SuccessAuthResponseDto } from './SuccessAuthResponseDto';

export type AuthResponseDto = SuccessAuthResponseDto | ErrorAuthResponseDto;
