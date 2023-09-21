import { CourseCardSkeleton } from '@/entities/Course';

export const UserCoursesSkeleton = () => {
  return (
    <section
      className='container 
    mx-auto 
    grid 
    grid-cols-1 
    gap-8 
    px-6 
    md:px-12 
    lg:grid-cols-2 
    xl:grid-cols-3
    [&>*:nth-child(n+3)]:hidden
    lg:[&>*:nth-child(n+3)]:flex
    lg:[&>*:nth-child(n+5)]:hidden
    xl:[&>*:nth-child(n+5)]:flex
    xl:[&>*:nth-child(n+7)]:hidden
    '
    >
      {Array.from({ length: 12 }).map((_, index) => {
        return <CourseCardSkeleton key={index} />;
      })}
    </section>
  );
};
