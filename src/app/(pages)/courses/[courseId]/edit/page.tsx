'use client';
import { useGetCourseQuery } from '@/entities/Course';
import { List, ListContent, ListIcon, ListItem, ListTitle, cn, useUpdateTitle } from '@/shared';
import { CourseCoAuthorEdit } from '@/widgets/CourseCoAuthorsEdit';
import { CourseContactsEdit } from '@/widgets/CourseContactsEdit';
import { CourseDescriptionEdit } from '@/widgets/CourseDescriptionEdit';
import { CourseInfoEdit } from '@/widgets/CourseInfoEdit';
import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';
import Link from 'next/link';

export default function CourseEditPage({
  params,
  searchParams,
}: {
  params: { courseId: string };
  searchParams: { settings?: string };
}) {
  const { data: course, isLoading } = useGetCourseQuery(params.courseId);

  useUpdateTitle(`Редактирование - ${course?.name || '<без названия>'}`);

  return (
    <>
      <Header href={`/courses/${params.courseId}`} />
      <div className='-ml-6 flex grow items-start gap-9 p-12'>
        <aside className='sticky top-28 flex w-64 flex-col'>
          <h3 className='px-6 pb-4 font-NTSomic text-lg leading-[26px] text-accent-secondary'>
            Настройки
          </h3>
          <List>
            <ListItem
              asChild
              className={cn(
                'hover:border-outlineGeneral hover:bg-whiteLight',
                searchParams.settings !== 'authors' &&
                  searchParams.settings !== 'contacts' &&
                  'border-outlineGeneral bg-whiteLight'
              )}
            >
              <Link href={`?settings=info`} scroll={false}>
                <ListIcon icon='label' />
                <ListContent>
                  <ListTitle>Информация</ListTitle>
                </ListContent>
              </Link>
            </ListItem>
            <ListItem
              asChild
              className={cn(
                'hover:border-outlineGeneral hover:bg-whiteLight',
                searchParams.settings === 'authors' && 'border-outlineGeneral bg-whiteLight'
              )}
            >
              <Link href={`?settings=authors`} scroll={false}>
                <ListIcon icon='group' />
                <ListContent>
                  <ListTitle>Авторы</ListTitle>
                </ListContent>
              </Link>
            </ListItem>
            <ListItem
              asChild
              className={cn(
                'hover:border-outlineGeneral hover:bg-whiteLight',
                searchParams.settings === 'contacts' && 'border-outlineGeneral bg-whiteLight'
              )}
            >
              <Link href={`?settings=contacts`} scroll={false}>
                <ListIcon icon='mail' />
                <ListContent>
                  <ListTitle>Контакты</ListTitle>
                </ListContent>
              </Link>
            </ListItem>
          </List>
        </aside>
        <main className='grow'>
          <div className='mx-auto flex w-full max-w-[45rem] flex-col gap-8'>
            {isLoading && (
              <>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div className='h-96 w-full animate-pulse rounded-2xl bg-whiteLight' key={i} />
                ))}
              </>
            )}
            {searchParams.settings !== 'contacts' && searchParams.settings !== 'authors' && (
              <>
                {course && (
                  <>
                    <CourseInfoEdit
                      courseId={course.id}
                      name={course.name}
                      shortDescription={course.shortDescription}
                      slug={course.slug}
                      isPublished={course.isPublished}
                    />
                    <CourseDescriptionEdit courseId={course.id} description={course.description} />
                  </>
                )}
              </>
            )}
            {searchParams.settings === 'authors' && (
              <>
                {course && (
                  <CourseCoAuthorEdit
                    courseId={course.id}
                    authors={course.authors}
                    coauthors={course.coauthors}
                  />
                )}
              </>
            )}
            {searchParams.settings === 'contacts' && (
              <>{course && <CourseContactsEdit courseId={course.id} contacts={course.links} />}</>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
