'use client';
import { FC } from 'react';
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
  logoUrl?: string;
  href?: string;
  title?: string;
}

export const Header: FC<IProps> = ({ logoUrl, title, href }) => {
  const scrollHeight = useScrollPosition();
  const session = useSession();

  const SCROLL_THRESHOLD = 50;

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-40 mr-[var(--removed-body-scroll-bar-size)] flex items-center justify-between bg-background px-12 pb-9 pt-12 transition-[padding]',
        scrollHeight > SCROLL_THRESHOLD && 'py-[0.875rem]'
      )}
    >
      <div>
        {(title || logoUrl) && (
          <Link
            href={href || '/'}
            className='flex items-center gap-6 transition-all'
            scroll={false}
          >
            {logoUrl && (
              <Image
                src='/logo.svg'
                quality={100}
                alt='Radium'
                width={48}
                height={48}
                priority
                className={cn('h-12 transition-[height]', scrollHeight > SCROLL_THRESHOLD && 'h-9')}
              />
            )}
            {title && (
              <h1
                className={cn(
                  'font-NTSomic text-xl font-bold text-primary transition-[font-size]',
                  scrollHeight > SCROLL_THRESHOLD && 'text-lg'
                )}
              >
                {title}
              </h1>
            )}
          </Link>
        )}
      </div>
      <div className='flex items-center gap-6 justify-self-end'>
        {session?.data?.user.name && (
          <span className='font-NTSomic leading-tight text-primary'>{session.data.user.name}</span>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger className='rounded-full'>
            <Avatar
              className={cn(
                'h-12 w-12 transition-all',
                scrollHeight > SCROLL_THRESHOLD && 'h-9 w-9'
              )}
            >
              <AvatarImage
                className='object-cover'
                src={session.data?.user.image || undefined}
                alt='User avatar'
              />
              <AvatarFallback>
                <Image src='/defaultProfile.svg' alt='default logo' height={48} width={48} />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-64' align='end'>
            <DropdownMenuItem asChild className='cursor-pointer'>
              <Link href='/profile' scroll={false}>
                <Icon className='mr-4 text-primary' type='profile' />
                <span>Мой профиль</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className='cursor-pointer'>
              <Link href='/' scroll={false}>
                <Icon className='mr-4 text-primary' type='courses' />
                <span>Мои курсы</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()} className='cursor-pointer'>
              <Icon className='mr-4 text-primary' type='exit' />
              <span>Выйти</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
