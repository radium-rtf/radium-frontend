'use client';
import React from 'react';
import { HeaderMenu } from './HeaderMenu';
import { useSession } from 'next-auth/react';

export const HeaderProfile = () => {
  const { data: session } = useSession();
  return (
    <div className='flex items-center gap-6'>
      {session?.user.name && (
        <span className='font-mono text-[0.8125rem] leading-tight  text-accent-primary-200'>
          {session.user.name}
        </span>
      )}
      <HeaderMenu photo={session?.user.image} />
    </div>
  );
};
