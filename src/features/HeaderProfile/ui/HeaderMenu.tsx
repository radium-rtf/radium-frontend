'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from '@/shared';
import { FC, useState } from 'react';
import { signOut } from 'next-auth/react';

interface IProps {
  photo?: string | null;
}

export const HeaderMenu: FC<IProps> = ({ photo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <Menu.Item asChild>
            <Link href='/profile'>
              <Menu.Icon icon='profile' />
              <Menu.Text>Мой профиль</Menu.Text>
            </Link>
          </Menu.Item>
          <Menu.Item asChild>
            <Link href='/'>
              <Menu.Icon icon='courses' />
              <Menu.Text>Мои курсы</Menu.Text>
            </Link>
          </Menu.Item>
          <Menu.Item onClick={() => signOut()}>
            <Menu.Icon icon='exit' />
            <Menu.Text>Выйти</Menu.Text>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};
