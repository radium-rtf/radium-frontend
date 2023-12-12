import { Icon } from '@/shared';
import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer
      className='
      flex
      items-center
      justify-between
      bg-black/10
      px-12
      pb-12
      pt-8
      transition-all
      
      '
    >
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-2'>
          <Image src={'/logo.svg'} width={24} height={24} alt='Radium logo' />
          <h3 className='font-mono text-xl font-bold text-primary-default'>
            Радиум
          </h3>
        </div>
        <p className='text-[0.625rem] text-text-secondary'>
          2023 · Сделано в рамках Проектного Практикума
        </p>
      </div>
      <div>
        <Link
          href={'https://t.me/radium_rtf'}
          target='_blank'
          className='block rounded-lg p-2 transition-colors hover:bg-white/5'
        >
          <Icon type='telegram' />
        </Link>
      </div>
    </footer>
  );
};
