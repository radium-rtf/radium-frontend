import React from 'react';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession();
  console.log(session);

  return <main>{session?.user?.name}</main>;
}
