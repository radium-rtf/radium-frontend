import { CourseNavigation, getCourse } from '@/entities/Course';
import { getPageById } from '@/entities/Page';
import { CoursePage } from '@/widgets/CoursePage';
import { Header } from '@/widgets/Header';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface IProps {
  params: {
    slug: string;
  };
  searchParams: Record<string, string>;
}

export default async function Page({ params, searchParams }: IProps) {
  const course = await getCourse(params.slug);

  if (typeof course === 'string') {
    if (course === 'Not authenticated') {
      redirect('/login');
    }
    return;
  }

  const selectedPage = searchParams.page || course.modules[0].pages[0].id;
  const page = await getPageById(selectedPage);
  console.log(page);

  return (
    <>
      <Header>
        <Link href='/' className='flex items-center gap-6'>
          <Image
            src={course.logo}
            alt={course.name}
            width={48}
            height={48}
            className='object-cover'
          />
          <h1 className='text-4xl font-bold text-accent-primary-200'>
            {course.name}
          </h1>
        </Link>
      </Header>
      <div className='flex flex-grow items-start gap-8 px-12'>
        <CourseNavigation modules={course.modules} className='-ml-6' />
        <div className='flex flex-grow justify-center'>
          {typeof page !== 'string' && <CoursePage page={page} />}
        </div>
      </div>
    </>
  );
}
