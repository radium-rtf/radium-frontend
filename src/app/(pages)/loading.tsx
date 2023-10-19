import { HeaderSkeleton } from '@/widgets/Header';
import { UserCoursesSkeleton } from '@/widgets/UserCourses';

export default function Loading() {
  return (
    <>
      <HeaderSkeleton />
      <main className='flex flex-col'>
        <UserCoursesSkeleton />
      </main>
    </>
  );
}
