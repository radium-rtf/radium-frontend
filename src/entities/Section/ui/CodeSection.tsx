'use client';
import './code.css';

import { Button, Card, Icon, Tab, Tabs, cn } from '@/shared';
import { FC, FormEventHandler, useState } from 'react';
import { useAnswerMutation } from '../api/sectionApi';
import { CodeSectionResponseDto } from '../model/codeSectionResponseDto';
import { Editor } from '@monaco-editor/react';

interface IProps {
  data: CodeSectionResponseDto;
}

export const CodeSection: FC<IProps> = ({ data }) => {
  const [verdict, setVerdict] = useState<CodeSectionResponseDto['verdict']>(
    data.verdict
  );
  const [answer, { isLoading, isError }] = useAnswerMutation();
  const [code, setCode] = useState<string>('');
  const [lang, setLang] = useState('javascript');
  const [isCodeWriting, setIsCodeWriting] = useState(true);

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    answer({
      id: data.id,
      code: {
        answer: code,
        lang: lang,
      },
    })
      .unwrap()
      .then((result) => {
        result && setVerdict(result.verdict);
      });
  };

  return (
    <Card asChild>
      <form className='flex flex-col gap-4' onSubmit={onSubmitHandler}>
        <div className='flex items-center gap-4 text-primary-default'>
          <Icon type='question' className='text-inherit' />
          <span className='font-mono font-bold leading-[normal] text-inherit'>
            Вопрос
          </span>
        </div>
        <header className='text-[0.8125rem] leading-normal'>
          {data.content}
        </header>
        <main className='flex !resize-y flex-col gap-4'>
          <Tabs>
            <Tab
              type='button'
              onClick={() => !isCodeWriting && setIsCodeWriting(true)}
              isSelected={isCodeWriting}
              icon='editor'
            >
              Редактор
            </Tab>
            <Tab
              type='button'
              onClick={() => isCodeWriting && setIsCodeWriting(false)}
              isSelected={!isCodeWriting}
              icon='attach'
            >
              Прикрепить файл
            </Tab>
          </Tabs>
          <Editor
            onChange={(val) => setCode(val!)}
            className='min-h-[16rem] !rounded-lg [&>.line-numbers]:bg-white'
            options={{
              autoIndent: 'full',
              lineHeight: 20,
              fontSize: 13,
              fontFamily: 'var(--font-nt-somic)',
              folding: false,
              minimap: {
                enabled: false,
              },
              scrollbar: {
                vertical: 'hidden',
                horizontal: 'hidden',
              },
              lightbulb: {
                enabled: false,
              },
              overviewRulerBorder: false,
              hideCursorInOverviewRuler: true,
              glyphMargin: false,
              useShadowDOM: false,
              renderLineHighlight: 'none',
            }}
            theme='vs-dark'
            language={lang}
          />
        </main>
        <footer className='flex items-center gap-4 place-self-end'>
          <div className='flex flex-col gap-2 text-[0.8125rem]'>
            {verdict === 'OK' && (
              <span className='text-accent-secondary-300'>Верно!</span>
            )}
            {verdict === 'WAIT' && (
              <span className='text-accent-primary-200'>
                Принято на проверку
              </span>
            )}
            {verdict === 'WA' && (
              <span className='text-accent-destructive-300'>Не правильно!</span>
            )}
          </div>
          {!isLoading && !isError && (
            <span
              className={cn(
                'text-[0.8125rem]',
                verdict === 'OK' && 'text-accent-secondary-300'
              )}
            >
              {verdict === 'OK' && `${data.maxScore} / ${data.maxScore}`}
              {verdict === 'WAIT' && `${0} / ${data.maxScore}`}
              {verdict === 'WA' && `${0} / ${data.maxScore}`}
              {verdict === '' && `${data.maxScore}`}
              <span> баллов</span>
            </span>
          )}
          <Button type='reset'>Сбросить</Button>
          <Button disabled={isLoading} type='submit' color='accent'>
            Ответить
          </Button>
        </footer>
      </form>
    </Card>
  );
};
