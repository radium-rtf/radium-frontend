import { Button, Icon } from '@/shared';
import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer
      className='
      flex
      items-center
      justify-between
      px-12
      pb-12
      pt-8
      transition-all
      
      '
    >
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-2'>
          <Image src={'/logo.svg'} width={24} height={24} alt='Radium logo' />
          <h3 className='font-NTSomic text-xl font-bold text-primary'>Радиум</h3>
        </div>
        <p className='text-text-secondary text-[0.625rem]'>
          2023 · Сделано в рамках Проектного Практикума
        </p>
      </div>
      <div className='flex items-center gap-4'>
        <Button asChild variant='outline'>
          <Link href='https://forms.yandex.ru/u/65813b42068ff01a6fb720a1/' target='_blank'>
            <Icon type='bug' className='mr-4 text-inherit' />
            <span>Оставить обратную связь</span>
          </Link>
        </Button>
        <Link
          href={'https://t.me/radium_rtf'}
          target='_blank'
          className='block rounded-[0.5rem] p-2 transition-colors hover:bg-white/5'
        >
          <Icon type='telegram' />
        </Link>
      </div>
    </footer>
  );
};
