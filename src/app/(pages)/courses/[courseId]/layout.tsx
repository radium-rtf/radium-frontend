import { CourseEditContextWrapper } from '@/features/CourseEditContext';
import { ReactNode } from 'react';

export default function CourseLandingLayout({ children }: { children: ReactNode }) {
  return <CourseEditContextWrapper>{children}</CourseEditContextWrapper>;
}
