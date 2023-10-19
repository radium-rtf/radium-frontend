import { authOptions } from '@/entities/Auth';
import { Header } from '@/widgets/Header';
import { ProfileEdit } from '@/widgets/ProfileEdit';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  return (
    <>
      <Header>
        <Link href='/' className='flex items-center gap-6'>
          <Image src='/logo.svg' alt='Radium' width={48} height={48} />
          <h1 className='font-mono text-4xl font-bold text-accent-primary-200'>
            Профиль
          </h1>
        </Link>
      </Header>
      <main className='flex h-full flex-grow items-center justify-center'>
        <ProfileEdit name={session.user.name!} />
      </main>
    </>
  );
}
