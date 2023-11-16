'use client'
import { useCourseByIdQuery } from '@/entities/Course';
import { GroupReportTable, useCourseReportQuery } from '@/entities/Group';
import { useGroupQuery } from '@/entities/Group/api/groupApi';
import { Icon, List, ListItem } from '@/shared';
import { CourseHeader } from '@/widgets/CourseHeader';
import Image from 'next/image';

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
                <aside className='min-w-min w-full max-w-xs ml-6'>
                    <h3 className='p-6 text-xl text-accent-secondary-100'>{group.name}</h3>
                    <List className='w-full'>
                        {[(<ListItem
                            key='Ведомость'
                            disabled={true}
                            className='bg-text-primary bg-opacity-5 cursor-default' href={''}>
                            <Icon type='table' />
                            Ведомость
                        </ListItem>),
                        ...courseReport.rows.map((row, index) =>
                        (<ListItem key={index} href={''}>
                            <>
                                <Image width={18} height={18} className="rounded-full" src={row.user.avatar} alt={row.user.name}></Image>
                                {row.user.name}
                            </>
                        </ListItem>))]}
                    </List>
                </aside>
                <main className='flex flex-col w-5/65'>
                    <section className='ml-12 w-4/5'>
                        <GroupReportTable courseReport={courseReport} />
                    </section>
                </main>
            </div>
        </>
    );
}
