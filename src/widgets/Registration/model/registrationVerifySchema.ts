import { z } from 'zod';

export const registrationVerifySchema = z.object({
  email: z.string().email('Неверная почта'),
  verificationCode: z.string().min(6, 'Неверная длина кода').max(6, 'Неверная длина кода'),
});

export type registrationVerifySchemaType = z.infer<typeof registrationVerifySchema>;
