'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode, useLayoutEffect } from 'react';
import {
  Button,
  cn,
  Icon,
  ListContent,
  ListItem,
  ListTitle,
  Progress,
} from '@/shared';
import { Header } from '@/widgets/Header';
import { useParams } from 'next/navigation';
import { CourseEditToggle } from '@/features/CourseEditToggle';
import { CourseEditContextWrapper } from '@/features/CourseEditContext';
import { NavigationCreateModule } from '@/features/NavigationCreateModule';
import { CourseModuleNavigation } from '@/widgets/CourseModuleNavigation';
import { CreateCourseSection } from '@/features/CreateCourseSection';
import { useCourseRoles, useGetCourseQuery } from '@/entities/Course';
import { Footer } from '@/widgets/Footer';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  restrictToFirstScrollableAncestor,
  restrictToParentElement,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import { useChangeCourseModuleOrderMutation } from '@/entities/CourseModule';
import { NavigationModuleTitleSkeleton } from '@/features/NavigationModuleTitle';
import { NavigationPageTitleSkeleton } from '@/features/NavigationPageTitle';

interface CourseStudyLayoutProps {
  children: ReactNode;
}

export default function CourseStudyLayout({
  children,
}: CourseStudyLayoutProps) {
  const params: { courseId?: string; pageId?: string } = useParams();
  const {
    data: course,
    isLoading,
    error,
  } = useGetCourseQuery(params.courseId!, {
    skip: !params.courseId,
  });

  const [updateOrder] = useChangeCourseModuleOrderMutation();

  useLayoutEffect(() => {
    if (course) {
      window.document.title = course.name || '<без названия>';
    }
  }, [course]);

  const { isAuthor, isCoauthor } = useCourseRoles(course);
  const isEditAllowed = isAuthor || isCoauthor;

  // DND Sensors
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // DND Handler
  const onDragEndHandler = (e: DragEndEvent) => {
    if (course && e.over && e.active.id !== e.over?.id) {
      console.log(e.over.data.current!.order);
      console.log(e.active.data.current!.order);
      updateOrder({
        courseId: course.id,
        moduleId: e.active.id as string,
        order: e.over.data.current!.order,
      });
    }
  };

  return (
    <>
      <Header>
        {isLoading && (
          <div className='flex items-center gap-6'>
            <div className='bg-background-card h-12 w-12 animate-pulse rounded-lg' />
            <div className='bg-background-card h-10 w-64 animate-pulse rounded-lg' />
          </div>
        )}
        {course && (
          <Link href='/' className='flex items-center gap-6'>
            {course.logo ? (
              <Image
                src={course.logo}
                alt={course.name}
                width={48}
                height={48}
                className='h-12 w-12 rounded-[0.5rem] object-cover'
              />
            ) : (
              <div className='bg-background-overlay h-12 w-12 rounded-lg object-cover'></div>
            )}
            <h1 className='font-NTSomic text-4xl font-bold text-primary'>
              {course.name}
            </h1>
          </Link>
        )}
      </Header>
      <main className='mb-8 flex flex-grow px-12'>
        <CourseEditContextWrapper>
          {/* Loading state */}
          {isLoading && (
            <nav className='sticky top-[8.625rem] -ml-6 flex max-h-[calc(100vh-8.65rem)] w-64 shrink-0 flex-grow-0 flex-col gap-4'>
              <div className='bg-background-card h-10 w-64 animate-pulse rounded-lg' />
              <NavigationModuleTitleSkeleton />
              <NavigationPageTitleSkeleton />
              <NavigationPageTitleSkeleton />
              <NavigationPageTitleSkeleton />
              <NavigationModuleTitleSkeleton />
              <NavigationPageTitleSkeleton />
              <NavigationPageTitleSkeleton />
              <NavigationPageTitleSkeleton />
            </nav>
          )}
          {/* Course state */}
          {course && (
            <nav className='sticky top-[8.625rem] -ml-6 flex max-h-[calc(100vh-8.65rem)] w-64 shrink-0 flex-grow-0 flex-col self-start'>
              {isEditAllowed && <CourseEditToggle />}
              <Progress
                className='w-64 px-6 py-2.5'
                theme='primary'
                percentage={
                  ((course.maxScore ? course.score : 1) /
                    (course.maxScore || 1)) *
                  100
                }
                showPercentage
              />

              {course.groups?.map((group, index) => (
                <ListItem key={index} asChild>
                  <Link
                    href={`/groups/${group.id}/courses/${course.id}`}
                    className={cn(
                      'flex w-64 rounded-lg border border-transparent px-6 py-2 transition-colors hover:border-white/10 hover:bg-white/5'
                    )}
                  >
                    <Icon type='group' className='text-primary-default' />
                    <ListContent>
                      <ListTitle>{group.name}</ListTitle>
                    </ListContent>
                    <Icon
                      className='text-primary-default h-3 w-3'
                      type='chevron-right'
                    />
                  </Link>
                </ListItem>
              ))}

              <ul
                className='
              [&:hover::-webkit-scrollbar-thumb]:bg-grey-300
              overflow-y-scroll
              [&::-webkit-scrollbar-thumb]:rounded
              [&::-webkit-scrollbar-thumb]:bg-transparent
              [&::-webkit-scrollbar-thumb]:transition-colors
              [&::-webkit-scrollbar]:w-1
              [&::-webkit-scrollbar]:opacity-0
              '
              >
                <DndContext
                  onDragEnd={onDragEndHandler}
                  sensors={sensors}
                  modifiers={[
                    restrictToVerticalAxis,
                    restrictToParentElement,
                    restrictToFirstScrollableAncestor,
                  ]}
                >
                  <SortableContext
                    items={course.modules}
                    strategy={verticalListSortingStrategy}
                  >
                    {course.modules.map((module) => {
                      return (
                        <CourseModuleNavigation
                          courseId={course.id}
                          key={module.id}
                          module={module}
                          currentPage={params.pageId}
                        />
                      );
                    })}
                  </SortableContext>
                </DndContext>
                <li></li>
              </ul>
              <NavigationCreateModule className='w-full' courseId={course.id} />
            </nav>
          )}
          {!error && (
            <>
              <div className='flex flex-grow justify-center'>
                {course && children}
              </div>
              {params.pageId && course && <CreateCourseSection />}
            </>
          )}
          {/* Error state */}
          {error && (
            <>
              <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
                <Image
                  src={'/error.svg'}
                  width={224}
                  height={224}
                  alt='Not found error'
                />
                <h1 className='text-primary-default font-mono text-5xl font-bold'>
                  Такого курса нет :(
                </h1>
                <p className='text-text-primary text-[0.8125rem]'>
                  Возможно курс был удален или вы перешли по неверной ссылке
                </p>
                <Button color='accent' asChild className='w-64'>
                  <Link href='/' scroll={false}>
                    <Icon type='arrow-left' className='text-inherit' />
                    <span className='ml-[calc(50%-34px)] -translate-x-1/2'>
                      На главную
                    </span>
                  </Link>
                </Button>
              </div>
            </>
          )}
        </CourseEditContextWrapper>
      </main>
      <Footer />
    </>
  );
}
