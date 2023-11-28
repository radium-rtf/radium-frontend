'use client';
import { CourseEditContext } from '@/features/CourseEditContext';
import { List } from '@/shared';
import { useParams } from 'next/navigation';
import { FC, useContext } from 'react';
import { useCreateSectionMutation } from '../api/createCourseSectionApi';

interface CreateCourseSectionProps {}

export const CreateCourseSection: FC<CreateCourseSectionProps> = () => {
  const { isEditing } = useContext(CourseEditContext);
  const { pageId } = useParams() as { pageId: string };
  const [createSection] = useCreateSectionMutation();

  if (!isEditing) return null;

  return (
    <aside className='sticky right-0 top-[8.625rem] -mr-6 h-[calc(100vh-8.65rem)] w-64'>
      <h3 className='px-6 py-4 font-mono text-xl font-bold text-primary-default'>
        Элементы
      </h3>
      <List>
        <List.Item asChild>
          <button
            className='rounded-lg border border-transparent text-start transition-colors hover:border-white/10 hover:bg-white/5'
            onClick={() =>
              createSection({ pageId, text: { content: 'New section' } })
            }
          >
            <List.Icon icon='table' className='text-primary-default' />
            <List.Content>
              <List.Title>Текст</List.Title>
            </List.Content>
          </button>
        </List.Item>
      </List>
      <List>
        <h3 className='px-6 py-4 font-mono text-xl font-bold text-primary-default'>
          Вопросы
        </h3>
        <List.Item asChild>
          <button
            className='rounded-lg border border-transparent text-start transition-colors hover:border-white/10 hover:bg-white/5'
            onClick={() =>
              createSection({
                pageId,
                choice: {
                  answer: 'Верный ответ',
                  question: 'Вопрос?',
                  variants: ['Верный ответ', 'Неверный ответ'],
                },
              })
            }
          >
            <List.Icon icon='table' className='text-primary-default' />
            <List.Content>
              <List.Title>Один вариант</List.Title>
            </List.Content>
          </button>
        </List.Item>
        <List.Item asChild>
          <button
            className='group rounded-lg border border-transparent text-start transition-colors hover:border-white/10 hover:bg-white/5'
            onClick={() =>
              createSection({
                pageId,
                multichoice: {
                  answer: ['Верный 1', 'Верный 2'],
                  question: 'Вопрос',
                  variants: [
                    'Верный 1',
                    'Верный 2',
                    'Неверный 1',
                    'Неверный 2',
                  ],
                },
              })
            }
          >
            <List.Icon icon='table' className='text-primary-default' />
            <List.Content>
              <List.Title>Несколько вариантов</List.Title>
            </List.Content>
            <List.Icon
              icon='add'
              className='h-3 text-primary-default opacity-0 transition-opacity group-hover:opacity-100'
            />
          </button>
        </List.Item>
        <List.Item asChild>
          <button
            className='group rounded-lg border border-transparent text-start transition-colors hover:border-white/10 hover:bg-white/5'
            onClick={() =>
              createSection({
                pageId,
                shortanswer: {
                  answer: 'Короткий ответ!',
                  question: 'Короткий вопрос?',
                },
              })
            }
          >
            <List.Icon icon='table' className='text-primary-default' />
            <List.Content>
              <List.Title>Короткий вопрос</List.Title>
            </List.Content>
            <List.Icon
              icon='add'
              className='h-3 text-primary-default opacity-0 transition-opacity group-hover:opacity-100'
            />
          </button>
        </List.Item>
        <List.Item asChild>
          <button
            className='group rounded-lg border border-transparent text-start transition-colors hover:border-white/10 hover:bg-white/5'
            onClick={() =>
              createSection({
                pageId,
                permutation: {
                  answer: ['1', '2', '3', '4'],
                  question: 'Перестановка',
                },
              })
            }
          >
            <List.Icon icon='table' className='text-primary-default' />
            <List.Content>
              <List.Title>Перестановки</List.Title>
            </List.Content>
            <List.Icon
              icon='add'
              className='h-3 text-primary-default opacity-0 transition-opacity group-hover:opacity-100'
            />
          </button>
        </List.Item>
      </List>
      <h3 className='px-6 py-4 font-mono text-xl font-bold text-primary-default'>
        Задания
      </h3>
      <List>
        <List.Item asChild>
          <button
            className='rounded-lg border border-transparent text-start transition-colors hover:border-white/10 hover:bg-white/5'
            onClick={() =>
              createSection({ pageId, answer: { question: 'Вопрос?' } })
            }
          >
            <List.Icon icon='table' className='text-primary-default' />
            <List.Content>
              <List.Title>Длинный ответ</List.Title>
            </List.Content>
          </button>
        </List.Item>
      </List>
    </aside>
  );
};
