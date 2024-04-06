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
  IconButton,
} from '@/shared';
import Link from 'next/link';
import Image from 'next/image';

interface IProps {
  logoUrl?: string;
  href?: string;
  title?: string;
}

export const Header: FC<IProps> = ({ logoUrl, title, href }) => {
  const session = useSession();

  return (
    <header className='sticky top-0 z-40 flex items-center gap-4 bg-backgroundHeader px-12 py-3.5'>
      <Link href={href || '/'} className='contents' scroll={false}>
        <Image
          src={logoUrl || '/logo.svg'}
          alt={`Url to ${title || 'home page'}`}
          width={24}
          height={24}
          className='h-6 w-6 rounded object-cover'
        />
        <h1 className='grow font-NTSomic text-lg font-medium text-primary'>{title || 'Радиум'}</h1>
      </Link>
      <IconButton>
        <Icon type='notification' className='shrink-0 text-inherit' />
      </IconButton>
      {session.data && (
        <p className='font-NTSomic leading-tight text-primary'>{session.data.user.name}</p>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton className='p-1.5'>
            <Avatar className='h-6 w-6'>
              <AvatarImage
                className='object-cover'
                src={session.data?.user.image || undefined}
                alt='User avatar'
              />
              <AvatarFallback>
                <Image src='/defaultProfile.svg' alt='default logo' height={48} width={48} />
              </AvatarFallback>
            </Avatar>
          </IconButton>
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
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='absolute bottom-0 right-0 translate-y-full'
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
        className='absolute bottom-0 left-0 translate-y-full -rotate-90'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M0 0H16V16C16 7.16344 8.83656 0 0 0Z'
          className='fill-backgroundHeader'
        />
      </svg>
    </header>
  );
};
