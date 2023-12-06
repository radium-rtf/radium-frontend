import { useUpdateCourseLogoMutation } from '@/entities/Course';
import { useUploadFileMutation } from '@/entities/File/api/fileApi';
import { Icon } from '@/shared';
import Image from 'next/image';
import { FC, FormEvent, useRef } from 'react';

interface ChangeCourseLogoProps {
  logo: string;
  courseId: string;
}

export const ChangeCourseLogo: FC<ChangeCourseLogoProps> = ({
  logo,
  courseId,
}) => {
  const [updateLogo] = useUpdateCourseLogoMutation();
  const [uploadFile] = useUploadFileMutation();
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(formRef.current!);
    uploadFile(fd)
      .unwrap()
      .then((res) => updateLogo({ logo: res.location, courseId: courseId }));
  };

  if (logo === '') {
    return (
      <form ref={formRef} onSubmit={onSubmitHandler}>
        <button
          onClick={() => inputRef.current?.click()}
          type='button'
          className='relative flex aspect-square h-[4.5rem] w-[4.5rem] items-center justify-center overflow-hidden rounded-lg bg-background-overlay'
        >
          <Icon type='add' />
        </button>
        <input
          name='file'
          ref={inputRef}
          onChange={() => formRef.current?.requestSubmit()}
          className='hidden'
          type='file'
          accept='image/*'
        />
      </form>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmitHandler}>
      <button
        onClick={() => inputRef.current?.click()}
        type='button'
        className='group relative overflow-hidden rounded-lg'
      >
        <Image
          src={logo}
          alt='logo'
          width={72}
          height={72}
          className='aspect-square h-[4.5rem] w-[4.5rem] object-cover'
        />
        <div className='absolute inset-0 flex items-center justify-center bg-gray-800/80 opacity-0 transition-opacity group-hover:opacity-100'>
          <Icon type='edit' />
        </div>
      </button>
      <input
        ref={inputRef}
        onChange={() => formRef.current?.requestSubmit()}
        type='file'
        accept='image/*'
        name='file'
        className='hidden'
      />
    </form>
  );
};
