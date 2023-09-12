import { getServerSession } from 'next-auth';
import { LoginCard } from '@/widgets/Login';

export default async function Page() {
  const session = await getServerSession();
  console.log(session);
  return (
    <main className='flex h-full items-center justify-center'>
      <LoginCard />
    </main>
  );
}
