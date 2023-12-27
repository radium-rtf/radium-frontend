'use client';
import { CourseEditContext } from '@/features/CourseEditContext';
import { List, ListContent, ListIcon, ListItem, ListTitle } from '@/shared';
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
          className='sticky right-0 top-[8.625rem] -mr-6 max-h-[calc(100vh-8.65rem)] w-64 self-start overflow-hidden'
        >
          <motion.div
            key='kkekekkkekekkdfsdfg'
            initial={{ x: 256 }}
            animate={{ x: 0 }}
            exit={{ x: 256 }}
            className='w-64'
          >
            <h3 className='px-6 py-4 font-NTSomic text-xl font-bold text-primary'>Элементы</h3>
            <List>
              <ListItem asChild>
                <button
                  className='rounded-lg border border-transparent text-start transition-colors hover:border-white/10 hover:bg-white/5'
                  onClick={() =>
                    createSection({ pageId, text: { content: 'New section' } })
                      .unwrap()
                      .then((res) => push(`#section-${res.id}`, { scroll: true }))
                  }
                >
                  <ListIcon icon='text' className='text-primary' />
                  <ListContent>
                    <ListTitle>Текст</ListTitle>
                  </ListContent>
                </button>
              </ListItem>
            </List>
            <List>
              <h3 className='px-6 py-4 font-NTSomic text-xl font-bold text-primary'>Вопросы</h3>
              <ListItem asChild>
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
                      .then((res) => push(`#section-${res.id}`, { scroll: true }))
                  }
                >
                  <ListIcon icon='radio' className='text-primary' />
                  <ListContent>
                    <ListTitle>Один вариант</ListTitle>
                  </ListContent>
                </button>
              </ListItem>
              <ListItem asChild>
                <button
                  className='group rounded-lg border border-transparent text-start transition-colors hover:border-white/10 hover:bg-white/5'
                  onClick={() =>
                    createSection({
                      pageId,
                      multichoice: {
                        answer: ['Верный 1', 'Верный 2'],
                        question: 'Вопрос',
                        variants: ['Верный 1', 'Верный 2', 'Неверный 1', 'Неверный 2'],
                      },
                    })
                      .unwrap()
                      .then((res) => push(`#section-${res.id}`, { scroll: true }))
                  }
                >
                  <ListIcon icon='checkbox' className='text-primary' />
                  <ListContent>
                    <ListTitle>Несколько вариантов</ListTitle>
                  </ListContent>
                  <ListIcon
                    icon='add'
                    className='h-3 text-primary opacity-0 transition-opacity group-hover:opacity-100'
                  />
                </button>
              </ListItem>
              <ListItem asChild>
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
                      .then((res) => push(`#section-${res.id}`, { scroll: true }))
                  }
                >
                  <ListIcon icon='editor' className='text-primary' />
                  <ListContent>
                    <ListTitle>Короткий ответ</ListTitle>
                  </ListContent>
                  <ListIcon
                    icon='add'
                    className='h-3 text-primary opacity-0 transition-opacity group-hover:opacity-100'
                  />
                </button>
              </ListItem>
              <ListItem asChild>
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
                      .then((res) => push(`#section-${res.id}`, { scroll: true }))
                  }
                >
                  <ListIcon icon='shuffle' className='text-primary' />
                  <ListContent>
                    <ListTitle>Перестановки</ListTitle>
                  </ListContent>
                  <ListIcon
                    icon='add'
                    className='h-3 text-primary opacity-0 transition-opacity group-hover:opacity-100'
                  />
                </button>
              </ListItem>
              <ListItem asChild>
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
                      .then((res) => push(`#section-${res.id}`, { scroll: true }))
                  }
                >
                  <ListIcon icon='matching' className='text-primary' />
                  <ListContent>
                    <ListTitle>Сопоставление</ListTitle>
                  </ListContent>
                  <ListIcon
                    icon='add'
                    className='h-3 text-primary opacity-0 transition-opacity group-hover:opacity-100'
                  />
                </button>
              </ListItem>
            </List>
            <h3 className='px-6 py-4 font-NTSomic text-xl font-bold text-primary'>Задания</h3>
            <List>
              <ListItem asChild>
                <button
                  className='rounded-lg border border-transparent text-start transition-colors hover:border-white/10 hover:bg-white/5'
                  onClick={() =>
                    createSection({ pageId, answer: { question: 'Вопрос?' } })
                      .unwrap()
                      .then((res) => push(`#section-${res.id}`, { scroll: true }))
                  }
                >
                  <ListIcon icon='table' className='text-primary' />
                  <ListContent>
                    <ListTitle>Длинный ответ</ListTitle>
                  </ListContent>
                </button>
              </ListItem>
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
                  <List.Icon icon='code' className='text-primary' />
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
