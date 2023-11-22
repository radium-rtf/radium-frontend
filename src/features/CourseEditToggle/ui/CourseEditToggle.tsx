'use client';
import { Icon, Toggle, cn } from '@/shared';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, HTMLAttributes, useCallback } from 'react';

interface IProps extends HTMLAttributes<HTMLDivElement> {}

export const CourseEditToggle: FC<IProps> = ({ className, ...props }) => {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const router = useRouter();
  return (
    <div
      className={cn('flex items-center gap-4 px-6 py-2.5', className)}
      {...props}
    >
      <Icon type='edit' className='flex-shrink-0 text-primary-default' />
      <p className='text-[0.8125rem] text-text-primary'>Режим редактирования</p>
      <Toggle
        checked={searchParams.get('isEditing') === 'true'}
        className='shrink-0'
        name='CourseEdit'
        onChange={() => {
          router.push(
            `?${createQueryString(
              'isEditing',
              searchParams.get('isEditing') === 'true' ? 'false' : 'true'
            )}`,
            { scroll: false }
          );
        }}
      />
    </div>
  );
};
