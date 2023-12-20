'use client';
import { CourseEditContext } from '@/features/CourseEditContext';
import { List } from '@/shared';
import { useParams, useRouter } from 'next/navigation';
import { FC, useContext } from 'react';
import { useCreateSectionMutation } from '../api/createCourseSectionApi';
import { AnimatePresence, motion } from 'framer-motion';

interface CreateCourseSectionProps {}

export const CreateCourseSection: FC<CreateCourseSectionProps> = () => {
  const { isEditing } = useContext(CourseEditContext);
  const { pageId } = useParams() as { pageId: string };
  const [createSection] = useCreateSectionMutation();
  const { push } = useRouter();

  return (
    <AnimatePresence>
      {isEditing && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 256 }}
          exit={{ width: 24 }}
          className='sticky right-0 top-[8.625rem] -mr-6 max-h-[calc(100vh-8.65rem)] w-64 overflow-hidden'
        >
          <motion.div
            key='kkekekkkekekkdfsdfg'
            initial={{ x: 256 }}
            animate={{ x: 0 }}
            exit={{ x: 256 }}
            className='w-64'
          >
            <h3 className='px-6 py-4 font-mono text-xl font-bold text-primary-default'>
              Элементы
            </h3>
            <List>
              <List.Item asChild>
                <button
                  className='rounded-lg border border-transparent text-start transition-colors hover:border-white/10 hover:bg-white/5'
                  onClick={() =>
                    createSection({ pageId, text: { content: 'New section' } })
                      .unwrap()
                      .then((res) =>
                        push(`#section-${res.id}`, { scroll: true })
                      )
                  }
                >
                  <List.Icon icon='text' className='text-primary-default' />
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
                      .unwrap()
                      .then((res) =>
                        push(`#section-${res.id}`, { scroll: true })
                      )
                  }
                >
                  <List.Icon icon='radio' className='text-primary-default' />
                  <List.Content>
                    <List.Title>Один вариант</List.Title>
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
                      .unwrap()
                      .then((res) =>
                        push(`#section-${res.id}`, { scroll: true })
                      )
                  }
                >
                  <List.Icon icon='checkbox' className='text-primary-default' />
                  <List.Content>
                    <List.Title>Несколько вариантов</List.Title>
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
                      .unwrap()
                      .then((res) =>
                        push(`#section-${res.id}`, { scroll: true })
                      )
                  }
                >
                  <List.Icon icon='editor' className='text-primary-default' />
                  <List.Content>
                    <List.Title>Короткий ответ</List.Title>
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
                      .unwrap()
                      .then((res) =>
                        push(`#section-${res.id}`, { scroll: true })
                      )
                  }
                >
                  <List.Icon icon='shuffle' className='text-primary-default' />
                  <List.Content>
                    <List.Title>Перестановки</List.Title>
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
                      mapping: {
                        answer: ['1', '2', '3', '4'],
                        keys: ['11', '22', '33', '44'],
                        question: 'Сопоставление',
                      },
                    })
                      .unwrap()
                      .then((res) =>
                        push(`#section-${res.id}`, { scroll: true })
                      )
                  }
                >
                  <List.Icon icon='matching' className='text-primary-default' />
                  <List.Content>
                    <List.Title>Сопоставление</List.Title>
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
                      .unwrap()
                      .then((res) =>
                        push(`#section-${res.id}`, { scroll: true })
                      )
                  }
                >
                  <List.Icon icon='table' className='text-primary-default' />
                  <List.Content>
                    <List.Title>Длинный ответ</List.Title>
                  </List.Content>
                </button>
              </List.Item>
              {/* <List.Item asChild>
                <button
                  className='rounded-lg border border-transparent text-start transition-colors hover:border-white/10 hover:bg-white/5'
                  onClick={() =>
                    createSection({
                      pageId,
                      code: { question: 'Программируй' },
                    })
                  }
                >
                  <List.Icon icon='code' className='text-primary-default' />
                  <List.Content>
                    <List.Title>Программирование</List.Title>
                  </List.Content>
                </button>
              </List.Item> */}
            </List>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
