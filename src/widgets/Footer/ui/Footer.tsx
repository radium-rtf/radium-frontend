import { Button, Icon, IconButton } from '@/shared';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className='relative flex h-16 items-center gap-4 bg-backgroundHeader px-12 py-[0.875rem]'>
      <p className='text-sm text-text-secondary'>
        Радиум · 2024 · Сделано в рамках Проектного Практикума
      </p>
      <div className='grow' />
      <Button asChild variant='outline'>
        <Link href='https://forms.yandex.ru/u/65813b42068ff01a6fb720a1/' target='_blank'>
          <Icon type='bug' className='mr-4 text-inherit' />
          <span>Оставить обратную связь</span>
        </Link>
      </Button>
      <IconButton asChild>
        <Link href={'https://t.me/radium_rtf'} target='_blank'>
          <Icon type='link' />
        </Link>
      </IconButton>
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='absolute right-0 top-0 -translate-y-full rotate-90'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M0 0H16V16C16 7.16344 8.83656 0 0 0Z'
          className='fill-backgroundHeader'
        />
      </svg>
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='absolute left-0 top-0 -translate-y-full -rotate-180'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M0 0H16V16C16 7.16344 8.83656 0 0 0Z'
          className='fill-backgroundHeader'
        />
      </svg>
    </footer>
  );
};
