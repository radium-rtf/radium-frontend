import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/entities/Auth';
import Image from 'next/image';
import { HeaderMenu } from '@/features/HeaderProfile/ui/HeaderMenu';

export const HeaderProfile = async () => {
  const session = await getServerSession(authOptions);
  // console.log(session);
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
