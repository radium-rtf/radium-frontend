import React, { FC } from 'react';
import Image from 'next/image';
import { cn, Icon } from '@/shared';
import localFont from 'next/font/local';
import Link from 'next/link';

const ntSomic = localFont({
  src: [
    {
      path: '../../../../public/fonts/NT-Somic/NTSomic-Bold.woff2',
      weight: '700',
    },
    {
      path: '../../../../public/fonts/NT-Somic/NTSomic-Regular.woff2',
      weight: '400',
    },
  ],
  variable: '--font-nt-somic',
});

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
        ntSomic.variable,
        'rounded-lg',
        'border-white/10',
        'outline-none',
        'bg-black',
        'bg-opacity-5'
      )}
    >
      <div className='mb-4'>
        <div className='flex gap-2'>
          <Image
            className='flex-shrink-0 rounded-full'
            src={avatar || 'defaultProfile.svg'}
            alt={name}
            width={18}
            height={18}
          />
          <h1 className='text-[0.8125rem] font-normal text-accent-primary-200'>
            {name}
          </h1>
          <Link className='ml-auto' href=''>
            <Icon type='link' />
          </Link>
        </div>
        <span className='font-sans text-[0.625rem] leading-[normal] text-foreground-secondary'>
          {date}
        </span>
      </div>
      <span className='text-[0.8125rem] font-normal text-text-primary leading-[normal]'>
        {comment}
      </span>
    </main>
  );
};
