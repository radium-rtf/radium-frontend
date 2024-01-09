'use client';
import { FC, ReactNode } from 'react';
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
  cn,
  useScrollPosition,
} from '@/shared';
import Link from 'next/link';
import Image from 'next/image';

interface IProps {
  children?: ReactNode;
}

export const Header: FC<IProps> = ({ children }) => {
  const scrollHeight = useScrollPosition();
  const session = useSession();

  const SCROLL_THRESHOLD = 50;

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-40 mr-[var(--removed-body-scroll-bar-size)] flex items-center justify-between bg-background px-12 pb-9 pt-12 transition-[padding]',
        scrollHeight > SCROLL_THRESHOLD && 'py-[0.875rem] text-xl'
      )}
    >
      <div
        className={cn(
          'content select-none [&_*]:transition-all',
          scrollHeight > SCROLL_THRESHOLD && '[&_h1]:!text-2xl [&_img]:h-9 [&_img]:!w-9'
        )}
      >
        {children}
      </div>
      <div className='flex items-center gap-6'>
        {session?.data?.user.name && (
          <span className='font-NTSomic text-[0.8125rem] leading-tight text-primary'>
            {session.data.user.name}
          </span>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger className='rounded-full'>
            <Avatar
              className={cn(
                'h-12 w-12 transition-all',
                scrollHeight > SCROLL_THRESHOLD && 'h-9 w-9'
              )}
            >
              <AvatarImage src={session.data?.user.image || undefined} alt='User avatar' />
              <AvatarFallback>
                <Image src='/defaultProfile.svg' alt='default logo' height={48} width={48} />
              </AvatarFallback>
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
