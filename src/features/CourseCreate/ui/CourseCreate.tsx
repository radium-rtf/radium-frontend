'use client';
import { Icon } from '@/shared';
import { useRouter } from 'next/navigation';
import { useCreateCourseMutation } from '@/entities/Course';

export const CourseCreate = () => {
  const router = useRouter();
  const [createCourse] = useCreateCourseMutation();

  const onClickHandler = () => {
    createCourse()
      .unwrap()
      .then((course) => {
        router.push(`/c/${course.slug}?initialEdit=true`);
      });
  };

  return (
    <button
      onClick={onClickHandler}
      type='button'
      className='flex min-h-[16rem] items-center justify-center gap-4 rounded-2xl bg-card transition-colors hover:bg-card-hover'
    >
      <Icon type='add' />
      <span className='font-NTSomic text-[0.8125rem]'>Создать курс</span>
    </button>
  );
};
