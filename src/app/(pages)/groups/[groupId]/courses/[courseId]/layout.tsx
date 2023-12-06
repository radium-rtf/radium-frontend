'use client';
import { store } from '@/shared';
import { Provider } from 'react-redux';

export default function CourseReportLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <Provider store={store}>{children}</Provider>;
}
