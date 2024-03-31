import React, { FC } from 'react';
import Image from 'next/image';
import { cn } from '@/shared';
interface IProps {
  avatar: string;
  name: string;
  date: string;
  comment: string;
}

export const Comment: FC<IProps> = ({ comment, date, name, avatar }) => {
  return (
    <main
      className={cn(
        'min-h-[6rem]',
        'w-full',
        'border',
        'p-4',
        'font-NTSomic',
        'rounded-[0.5rem]',
        'border-white/10',
        'outline-none',
        'bg-black',
        'bg-opacity-5'
      )}
    >
      <div className='mb-4'>
        <div className='flex items-center gap-2'>
          <Image
            className='aspect-square h-[1.125rem] w-[1.125rem] shrink-0 rounded-full'
            src={avatar || '/defaultProfile.svg'}
            alt={name}
            width={18}
            height={18}
          />
          <h1 className='text-[0.8125rem] font-normal text-primary'>{name}</h1>
        </div>
        <span className='text-foreground-secondary font-sans text-[0.625rem] leading-[normal]'>
          {date}
        </span>
      </div>
      <span className='text-[0.8125rem] font-normal leading-[normal] text-text-primary'>
        {comment}
      </span>
    </main>
  );
};
