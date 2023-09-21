'use client';
import React from 'react';
import { HeaderMenu } from '@/features/HeaderProfile/ui/HeaderMenu';
import { useSession } from 'next-auth/react';

export const HeaderProfileClient = () => {
  const { data: session } = useSession();
  return (
    <div className='flex items-center gap-6'>
      {session?.user.name && (
        <span className='text-sm text-accent-primary-200'>
          {session.user.name}
        </span>
      )}
      <HeaderMenu photo={session?.user.image} />
    </div>
  );
};