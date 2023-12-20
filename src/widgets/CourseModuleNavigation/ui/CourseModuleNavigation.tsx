'use client';
import { CourseResponseDto } from '@/entities/Course';
import { CourseEditContext } from '@/features/CourseEditContext';
import { NavigationCreatePage } from '@/features/NavigationCreatePage';
import { NavigationModuleTitle } from '@/features/NavigationModuleTitle';
import { NavigationPageTitle } from '@/features/NavigationPageTitle';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { CSSProperties, FC, HTMLAttributes, useContext } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/shared';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import { useChangeCoursePageOrderMutation } from '@/entities/CoursePage';

interface IProps extends HTMLAttributes<HTMLElement> {
  courseId: string;
  module: CourseResponseDto['modules'][0];
  currentPage?: string;
}

export const CourseModuleNavigation: FC<IProps> = ({
  courseId,
  module,
  currentPage,
  ...props
}) => {
  const { isEditing } = useContext(CourseEditContext);
  const isCurrentModule = module.pages.map((e) => e.id).includes(currentPage!);
  const [updateOrder] = useChangeCoursePageOrderMutation();

  // DND
  const {
    setNodeRef,
    setActivatorNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: module.id,
    data: {
      order: module.order,
    },
    disabled: !isEditing,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  } as CSSProperties;

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
    if (e.over && e.active.id !== e.over?.id) {
      console.log(e.over.data.current!.order);
      console.log(e.active.data.current!.order);
      updateOrder({
        order: e.over.data.current!.order,
        pageId: e.active.id as string,
        moduleId: module.id,
        courseId: courseId,
      });
    }
  };

  return (
    <nav
      ref={setNodeRef}
      style={style}
      {...props}
      className={cn(isDragging && 'z-20')}
    >
      <NavigationModuleTitle
        ref={setActivatorNodeRef}
        name={module.name}
        moduleId={module.id}
        isCurrentModule={isCurrentModule}
        {...listeners}
      />
      <DndContext
        onDragEnd={onDragEndHandler}
        sensors={sensors}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext items={module.pages}>
          <div>
            {module.pages.map((page) => (
              <NavigationPageTitle
                key={page.id}
                page={page}
                currentPage={currentPage}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      {isEditing && <NavigationCreatePage moduleId={module.id} />}
    </nav>
  );
};
