'use client';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { useSession } from 'next-auth/react';
import { CourseCreate } from '@/features/CourseCreate';
import { Card, CardContent, useGetTitleHello, useUpdateTitle } from '@/shared';
import { useGetAccountCoursesQuery } from '@/entities/Course';
import { AssignedCourseCard, AuthorShipCourseCard, CourseCard } from '@/widgets/CourseCard';
import { Slider } from '@/shared/ui/Slider';

export default function AllCoursesPage() {
  const { data: courses, isLoading } = useGetAccountCoursesQuery();
  const { data: session } = useSession();
  const hello = useGetTitleHello(session?.expires);
  useUpdateTitle('Мои курсы');

  return (
    <>
      <Header logoUrl='/logo.svg' title='Радиум' />
      <main className='container mx-auto my-12 flex flex-grow flex-col gap-6'>
        {isLoading ? (
          <>
            <div className='w-2/3 place-self-center'>
              <div className='h-16 w-4/6 animate-pulse place-self-center rounded-lg bg-card' />
              <div className='mt-4 h-[26px] w-1/3 animate-pulse place-self-center rounded-lg bg-card' />
              <div className='mt-8 h-[175px] animate-pulse place-self-center rounded-lg bg-card' />
            </div>

            <div className='mx-auto ml-48 mt-16 h-[42px] w-1/2 animate-pulse rounded-lg bg-card' />
            <div className='mx-auto mt-8 flex'>
              {Array.from({ length: 4 }).map((_, index) => (
                <Card className='mr-8 h-52 w-[370px] animate-pulse' key={index}>
                  {''}
                </Card>
              ))}
            </div>

            <div className='mx-auto ml-48 mt-16 h-[42px] w-1/2 animate-pulse rounded-lg bg-card' />
            <div className='mx-auto mt-8 flex'>
              {Array.from({ length: 4 }).map((_, index) => (
                <Card className='mr-8 h-52 w-[370px] animate-pulse' key={index}>
                  {''}
                </Card>
              ))}
            </div>

            <section>
              <div className='mx-auto ml-48 mt-16 h-[42px] w-1/2 animate-pulse rounded-lg bg-card' />
              <div className='container mx-auto mt-8 grid gap-8 px-6 md:px-12 lg:grid-cols-2 2xl:grid-cols-4'>
                {Array.from({ length: 8 }).map((_, index) => (
                  <Card className='h-64 animate-pulse' key={index}>
                    {''}
                  </Card>
                ))}
              </div>
            </section>
          </>
        ) : (
          <div className='w-2/3 place-self-center font-NTSomic'>
            <h2 className='text-2xl font-bold leading-[normal] text-primary'>
              {hello}, {session?.user.name} ✌️!
            </h2>
            <p className='mt-2'>Продолжим обучение?</p>
          </div>
        )}

        {courses && (
          <>
            {(!!courses.authorship.length ||
              session?.user.roles.isAuthor ||
              session?.user.roles.isCoauthor) && (
              <>
                <div className='mt-8 flex w-2/3 items-center justify-between place-self-center'>
                  <h2 className=' font-NTSomic text-xl font-bold leading-[normal] text-primary'>
                    Вы автор
                  </h2>
                  {session?.user.roles.isAuthor && <CourseCreate />}
                </div>

                <Slider>
                  {courses?.authorship.length ? (
                    courses.authorship.map((course) => {
                      return <AuthorShipCourseCard key={course.id} course={course} />;
                    })
                  ) : (
                    <>
                      <Card className='px-6 py-28 text-center'>
                        У вас ещё нет собственных курсов. <br />
                        Создайте свой первый!
                      </Card>
                      <Card className='px-6 py-28 text-center'>
                        Нажмите кнопку “Создать курс” над этими карточками, чтобы создать курс.
                      </Card>
                    </>
                  )}
                </Slider>
              </>
            )}
            {!!courses.my.length && (
              <>
                <h2 className='mt-8 w-2/3 place-self-center font-NTSomic text-xl font-bold leading-[normal] text-primary'>
                  Вы проходите
                </h2>
                <Slider>
                  {courses.my.map((course) => {
                    return <AssignedCourseCard key={course.id} course={course} />;
                  })}
                  <Card className='p-auto flex items-center px-6 text-center align-middle'>
                    <CardContent className='w-96'>
                      Выглядит пусто. <br />
                      Пролистайте вниз и запишитесь на пару курсов!
                    </CardContent>
                  </Card>
                </Slider>
              </>
            )}
            {!!courses.recommendations.length && (
              <>
                <h2 className='mt-8 w-2/3 place-self-center font-NTSomic text-xl font-bold leading-[normal] text-primary'>
                  Рекомендуем
                </h2>
                <section className='container grid grid-cols-1 gap-8 px-6 md:px-12 lg:grid-cols-2 2xl:grid-cols-3'>
                  {courses.recommendations.map((course) => {
                    return <CourseCard key={course.id} course={course} />;
                  })}
                </section>
              </>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
