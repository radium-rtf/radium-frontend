import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';
import { Metadata } from 'next';
import { authOptions } from '@/entities/Auth';
import { ProfileEdit } from '@/widgets/ProfileEdit';
import { getServerSession } from 'next-auth';

export const metadata: Metadata = {
  title: 'Профиль',
  description: 'Профиль',
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  return (
    <>
      <Header logoUrl='/logo.svg' title='Профиль' />
      <main className='mt-[8.25rem] flex h-full flex-grow items-center justify-center'>
        <ProfileEdit name={session.user.name!} />
      </main>
      <Footer />
    </>
  );
}
