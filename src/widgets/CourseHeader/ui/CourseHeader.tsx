import { Header } from '@/widgets/Header';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface IProps {
  logo: string;
  name: string;
}

export const CourseHeader: FC<IProps> = (course) => (
  <Header>
    <Link href='/' className='flex items-center gap-6'>
      <Image src={course.logo} alt={course.name} width={48} height={48} className='object-cover' />
      <h1 className='text-accent-primary-200 font-mono text-4xl font-bold'>{course.name}</h1>
    </Link>
  </Header>
);
