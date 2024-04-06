'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import {
  Button,
  cn,
  Icon,
  ListContent,
  ListItem,
  ListTitle,
  Progress,
  SmallIcon,
  useUpdateTitle,
} from '@/shared';
import { Header } from '@/widgets/Header';
import { useParams } from 'next/navigation';
import { CourseEditToggle } from '@/features/CourseEditToggle';
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

export default function CoursePageLayout({ children }: CourseStudyLayoutProps) {
  const params: { courseId: string; pageId: string } = useParams();
  const { data: course, isLoading, error } = useGetCourseQuery(params.courseId!);

  const [updateOrder] = useChangeCourseModuleOrderMutation();
  useUpdateTitle(course?.name);

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
      updateOrder({
        courseId: course.id,
        moduleId: e.active.id as string,
        order: e.over.data.current!.order,
      });
    }
  };

  return (
    <>
      <Header title={course?.name} href={`/courses/${course?.id}`} logoUrl={course?.logo} />
      {/* {isLoading && (
          <div className='flex items-center gap-6'>
            <div className='h-12 w-12 animate-pulse rounded-[0.5rem] bg-card' />
            <div className='h-10 w-64 animate-pulse rounded-[0.5rem] bg-card' />
          </div>
        )}
        {course && (
          <Link href={`/courses/${course.id}`} className='flex items-center gap-6'>
            {course.logo ? (
              <Image
                src={course.logo}
                alt={course.name}
                width={48}
                height={48}
                className='h-12 w-12 rounded-[0.5rem] object-cover'
              />
            ) : (
              <div className='h-12 w-12 rounded-[0.5rem] bg-popover object-cover'></div>
            )}
            <h1 className='font-NTSomic text-4xl font-bold text-primary'>{course.name}</h1>
          </Link>
        )} */}
      {/* </Header> */}
      <main className='my-12 flex flex-grow items-start gap-8 px-12'>
        {/* <CourseEditContextWrapper> */}
        {/* Loading state */}
        {isLoading && (
          <nav
            className={cn(
              'sticky top-28 -ml-6 flex max-h-[calc(100vh-8.25rem)] w-64 shrink-0 flex-grow-0 flex-col gap-4'
            )}
          >
            <div className='h-10 w-64 animate-pulse rounded-[0.5rem] bg-card' />
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
        {/* Course loaded state */}
        {course && (
          <nav
            className={cn(
              'sticky top-28 -ml-6 flex max-h-[calc(100vh-7rem)] w-64 shrink-0 flex-grow-0 flex-col self-start transition-all'
            )}
          >
            {isEditAllowed && <CourseEditToggle />}
            <Progress
              className='w-64 px-6 py-2.5'
              theme='primary'
              percentage={((course.maxScore ? course.score : 1) / (course.maxScore || 1)) * 100}
              showPercentage
            />

            {course.groups?.map((group, index) => (
              <ListItem key={index} asChild>
                <Link
                  href={`/groups/${group.id}/courses/${course.id}`}
                  className={cn(
                    'flex w-64 rounded-[0.5rem] border border-transparent px-6 py-2 transition-colors hover:border-white/10 hover:bg-white/5'
                  )}
                >
                  <Icon type='group' className='text-primary' />
                  <ListContent>
                    <ListTitle>{group.name}</ListTitle>
                  </ListContent>
                  <SmallIcon type='chevron-right' />
                </Link>
              </ListItem>
            ))}

            <ul className='scrollbar overflow-y-scroll'>
              <DndContext
                onDragEnd={onDragEndHandler}
                sensors={sensors}
                modifiers={[
                  restrictToVerticalAxis,
                  restrictToParentElement,
                  restrictToFirstScrollableAncestor,
                ]}
              >
                <SortableContext items={course.modules} strategy={verticalListSortingStrategy}>
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
              <li>
                <NavigationCreateModule className='w-full' courseId={course.id} />
              </li>
            </ul>
          </nav>
        )}
        {!error && (
          <>
            <div className='flex flex-grow justify-center'>{course && children}</div>
            {params.pageId && params.pageId !== '0' && course && <CreateCourseSection />}
          </>
        )}
        {/* Error state */}
        {error && (
          <>
            <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
              <Image src={'/error.svg'} width={224} height={224} alt='Not found error' />
              <h1 className='text-5xl font-NTSomic font-bold text-primary'>Такого курса нет :(</h1>
              <p className='text-[0.8125rem] text-text-primary'>
                Возможно курс был удален или вы перешли по неверной ссылке
              </p>
              <Button color='accent' asChild className='w-64'>
                <Link href='/' scroll={false}>
                  <Icon type='arrow-left' className='text-inherit' />
                  <span className='ml-[calc(50%-34px)] -translate-x-1/2'>На главную</span>
                </Link>
              </Button>
            </div>
          </>
        )}
        {/* </CourseEditContextWrapper> */}
      </main>
      <Footer />
    </>
  );
}
