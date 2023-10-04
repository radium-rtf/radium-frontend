import { Header } from '@/widgets/Header';
import Image from 'next/image';
import Link from 'next/link';

export default async function Page({
    // params,
}: {
        // params: {
        //     slug: string;
        // };
    }) {
    return (
        <>
            <Header>
                <Link href='/' className='flex items-center gap-6'>
                    <Image src='/logo.svg' alt='Radium' width={48} height={48} />
                    <h1 className='font-mono text-4xl font-bold text-accent-primary-200'>
                        Радиум
                    </h1>
                </Link>
            </Header>
            <main className='flex flex-col'>
            </main>
        </>
    );
}
