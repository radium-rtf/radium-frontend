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
        router.push(`/courses/${course.id}?initialEdit=true`);
      });
  };

  return (
    <button
      onClick={onClickHandler}
      type='button'
      className='flex min-h-[16rem] items-center justify-center gap-4 rounded-2xl bg-background-card'
    >
      <Icon type='add' />
      <span className='font-mono text-[0.8125rem]'>Создать курс</span>
    </button>
  );
};
