import { useUpdateCourseLogoMutation } from '@/entities/Course';
import { useUploadFileMutation } from '@/entities/File/api/fileApi';
import { Icon, cn } from '@/shared';
import { ButtonHTMLAttributes, ChangeEvent, FC, useEffect, useRef, useState } from 'react';

type ChangeCourseLogoProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  courseId: string;
  hideText?: boolean;
};

export const ChangeCourseLogo: FC<ChangeCourseLogoProps> = ({
  courseId,
  onClick,
  hideText = false,
  className,
  ...props
}) => {
  const [updateLogo] = useUpdateCourseLogoMutation();
  const [uploadFile] = useUploadFileMutation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isError) {
      timeoutId = setTimeout(setIsError, 2000, false);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isError]);

  const onChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('file', e.target.files![0]);
    const response = await uploadFile(fd);
    if (!('data' in response)) {
      setIsError(true);
      return;
    }
    const updateResponse = await updateLogo({ courseId, logo: response.data.location });
    if (!('data' in updateResponse)) {
      setIsError(true);
    }
  };

  return (
    <button
      onClick={(e) => {
        inputRef.current?.click();
        onClick?.(e);
      }}
      type='button'
      className={cn(
        'relative flex shrink-0 grow-0 items-center justify-center overflow-hidden rounded-[0.5rem]',
        isError && 'ring ring-red-500',
        className
      )}
      {...props}
    >
      <input
        name='file'
        ref={inputRef}
        onChange={onChangeHandler}
        className='hidden'
        type='file'
        accept='image/*'
      />
      {!hideText && <Icon type='add' />}
    </button>
  );
};
