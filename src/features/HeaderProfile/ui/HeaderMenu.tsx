'use client';
import Image from 'next/image';
import { Menu } from '@/shared';
import { FC, useEffect, useRef, useState } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

interface IProps {
  photo?: string | null;
}

export const HeaderMenu: FC<IProps> = ({ photo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const listener = (e: Event) => {
      e.target !== menuRef.current && setIsMenuOpen(false);
    };
    if (isMenuOpen) {
      document.body.addEventListener('click', listener);
    }
    return () => {
      document.body.removeEventListener('click', listener);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handler = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
      const scroll = window.scrollY || document.documentElement.scrollTop;

      if (scroll > 50) {
        divRef.current?.classList.replace('h-12', 'h-9');
        photoRef.current?.classList.replace('h-12', 'h-9');
      } else {
        divRef.current?.classList.replace('h-9', 'h-12');
        photoRef.current?.classList.replace('h-9', 'h-12');
      }
    };
    window.addEventListener('scroll', handler);
    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, [isMenuOpen]);

  return (
    <div ref={divRef} className='relative aspect-square h-12'>
      <button
        className='rounded-full'
        onClick={() => setIsMenuOpen((prev) => !prev)}
        type='button'
      >
        <Image
          ref={photoRef}
          src={photo || '/defaultProfile.svg'}
          alt='User photo'
          height={48}
          width={48}
          className='aspect-square h-12 cursor-pointer rounded-full object-cover transition-all'
        />
      </button>
      {isMenuOpen && (
        <Menu
          ref={menuRef}
          className='absolute -bottom-4 right-0 z-10 w-[216px] translate-y-full'
        >
          <Menu.Item asChild>
            <Link href='/profile' scroll={false}>
              <Menu.Icon icon='profile' />
              <Menu.Text>Мой профиль</Menu.Text>
            </Link>
          </Menu.Item>
          <Menu.Item asChild>
            <Link href='/' scroll={false}>
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
