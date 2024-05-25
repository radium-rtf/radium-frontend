'use client';
import { Button, Icon } from '@/shared';
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
    <Button variant='outline' onClick={onClickHandler} type='button' className='rounded-lg '>
      <Icon type='add' className='mr-4 shrink-0 text-inherit md:mr-16' />
      <span className='mr-4 font-NTSomic text-[0.8125rem] md:mr-16'>Создать курс</span>
    </Button>
  );
};
