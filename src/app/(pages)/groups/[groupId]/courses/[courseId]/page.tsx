'use client'
import { useCourseByIdQuery } from '@/entities/Course';
import { GroupReportTable, useCourseReportQuery } from '@/entities/Group';
import { useGroupQuery } from '@/entities/Group/api/groupApi';
import { Row } from '@/entities/Group/model/courseReportDto';
import { cn, List } from '@/shared';
import { CourseHeader } from '@/widgets/CourseHeader';
import Image from 'next/image';
import Link from 'next/link';

export default async function Page({
    params,
}: {
    params: {
        groupId: string;
        courseId: string;
    };
}) {
    const { data: courseReport } = useCourseReportQuery({
        groupId: params.groupId,
        courseId: params.courseId
    });
    const { data: group } = useGroupQuery(params.groupId);
    const { data: course } = useCourseByIdQuery(params.courseId);

    if (!courseReport || !course || !group) {
        return null;
    }

    return (
        <>
            <CourseHeader logo={course?.logo} name={course?.name}></CourseHeader>
            <div className='flex'>
                <aside className='ml-6'>
                    <h3 className='p-6 text-xl text-accent-secondary-100 select-none'>{group.name}</h3>
                    <List className='w-64'>
                        {[(<List.Item
                            key='Ведомость'
                            className='bg-text-primary bg-opacity-5 cursor-default rounded-lg select-none'>
                            <List.Icon icon='table' />
                            Ведомость
                        </List.Item>),
                        ...courseReport.rows.map((row: Row, index: number) =>
                        (<List.Item key={index} asChild>
                            <Link
                                className={cn(
                                    'flex',
                                    'rounded-lg border border-transparent',
                                    'transition-colors',
                                    'hover:border-white/10 hover:bg-white/5')}
                                href={''}>
                                <Image width={18} height={18} className="rounded-full" src={row.user.avatar}
                                    alt={row.user.name}></Image>
                                {row.user.name}
                            </Link>
                        </List.Item>
                        ))]}
                    </List>
                </aside>
                <main className='flex flex-col max-w-[75%]'>
                    <section className='ml-12'>
                        <GroupReportTable courseReport={courseReport} />
                    </section>
                </main>
            </div>
        </>
    );
}
