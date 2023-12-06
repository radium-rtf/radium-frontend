'use client';
import { ReduxStoreProvider } from '@/shared';

export default function CourseReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ReduxStoreProvider>{children}</ReduxStoreProvider>;
}
