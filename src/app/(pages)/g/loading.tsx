import { StudentAnswerPageSkeleton } from '@/widgets/StudentAnswerPage';
import { GroupMenuSkeleton } from '@/widgets/GroupMenu';

export default async function Page() {
  return (
    <>
      <div className='flex flex-grow items-start gap-8 px-12'>
        <GroupMenuSkeleton />
        <div className='w-[75%] flex-grow justify-center'>
          <StudentAnswerPageSkeleton />
        </div>
      </div>
    </>
  );
}
