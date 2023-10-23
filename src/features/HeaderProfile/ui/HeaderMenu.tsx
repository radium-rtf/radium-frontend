'use client';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { FC, useState } from 'react';
import { Menu, MenuItem } from '@/shared';
import { useRouter } from 'next/navigation';

interface IProps {
  photo?: string | null;
}

export const HeaderMenu: FC<IProps> = ({ photo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div className='relative'>
      <button
        className='rounded-full'
        onClick={() => setIsMenuOpen((prev) => !prev)}
        type='button'
      >
        <Image
          src={photo || '/defaultProfile.svg'}
          alt='User photo'
          height={48}
          width={48}
          className='aspect-square h-12 cursor-pointer rounded-full object-cover'
        />
      </button>
      {isMenuOpen && (
        <Menu className='absolute -bottom-4 right-0 z-10 w-[216px] translate-y-full'>
          <MenuItem onClick={() => router.push('/profile')} icon='profile'>
            Профиль
          </MenuItem>
          <MenuItem icon='courses'>Мои курсы</MenuItem>
          <MenuItem onClick={() => signOut()} icon='exit'>
            Мои выйти
          </MenuItem>
        </Menu>
      )}
    </div>
  );
};
