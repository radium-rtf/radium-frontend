'use client';
import React, { FC, ReactNode, useEffect, useRef } from 'react';
import { signOut, useSession } from 'next-auth/react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
} from '@/shared';
import Link from 'next/link';

interface IProps {
  children?: ReactNode;
}

export const Header: FC<IProps> = ({ children }) => {
  const headerRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const handler = () => {
      const scroll = window.scrollY || document.documentElement.scrollTop;

      if (scroll > 50) {
        headerRef.current?.classList.replace('pb-9', 'pb-[0.875rem]');
        headerRef.current?.classList.replace('pt-12', 'pt-[0.875rem]');
        headerRef.current?.classList.add(
          'text-xl',
          '[&>.content_h1]:!text-2xl',
          '[&>.content_img]:h-9',
          '[&>.content_img]:!w-9'
        );
      } else {
        headerRef.current?.classList.replace('pb-[0.875rem]', 'pb-9');
        headerRef.current?.classList.replace('pt-[0.875rem]', 'pt-12');
        headerRef.current?.classList.remove(
          'text-xl',
          '[&>.content_h1]:!text-2xl',
          '[&>.content_img]:h-9',
          '[&>.content_img]:!w-9'
        );
      }
    };
    window.addEventListener('scroll', handler);
    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, []);
  const session = useSession();

  return (
    <header
      ref={headerRef}
      className='
        fixed
        left-0
        right-0
        top-0
        z-40
        mr-[var(--removed-body-scroll-bar-size)]
        flex
        items-center
        justify-between
        bg-background
        px-12
        pb-9
        pt-12

        transition-[padding]
        [&>.content_*]:transition-all
        [&>.content_img]:transition-all
        '
    >
      <div className='content'>{children}</div>
      <div className='flex items-center gap-6'>
        {session?.data?.user.name && (
          <span className='font-NTSomic text-[0.8125rem] leading-tight text-primary'>
            {session.data.user.name}
          </span>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger className='rounded-full'>
            <Avatar className='h-12 w-12'>
              <AvatarImage src={session.data?.user.image || undefined} alt='User avatar' />
              <AvatarFallback>NF</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-64' align='end'>
            <DropdownMenuItem asChild>
              <Link href='/profile' scroll={false}>
                <Icon className='mr-4 text-inherit' type='profile' />
                <span>Мой профиль</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/' scroll={false}>
                <Icon className='mr-4 text-inherit' type='courses' />
                <span>Мои курсы</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>
              <Icon className='mr-4 text-inherit' type='exit' />
              <span>Выйти</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
