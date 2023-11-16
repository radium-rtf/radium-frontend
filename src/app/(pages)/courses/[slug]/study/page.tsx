'use client';
import { CourseNavigation } from '@/entities/Course';
import { useCourseBySlugQuery } from '@/entities/Course/api/courseApi';
import { usePageQuery } from '@/entities/Page';
import { CourseHeader } from '@/widgets/CourseHeader';
import { CoursePage } from '@/widgets/CoursePage';

interface IProps {
  params: {
    slug: string;
  };
  searchParams: Record<string, string>;
}

export default function Page({ params, searchParams }: IProps) {
  const { data: course } = useCourseBySlugQuery(params.slug);
  console.log(course?.authors);

  const { data: page } = usePageQuery(
    searchParams.page || (course?.modules[0].pages[0].id as string),
    { skip: !course || !course.modules.length || !course.modules[0].pages }
  );

  if (!course || !page) {
    return null;
  }

  window.document.title = `${page.name} - ${course.name}`;

  return (
    <>
      <CourseHeader logo={course.logo} name={course.name}></CourseHeader>
      <div className='flex flex-grow items-start gap-8 px-12'>
        <CourseNavigation
          modules={course.modules}
          className='-ml-6'
          currentPage={page.id}
        />
        <div className='flex flex-grow justify-center'>
          <CoursePage page={page} />
        </div>
      </div>
    </>
  );
}
