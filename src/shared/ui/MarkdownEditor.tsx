'use client';
import { LexicalComposer, InitialConfigType } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
} from '@lexical/markdown';
import { FC, useState } from 'react';
import { EditorBoldControl } from './EditorBoldControl';
import { EditorItalicControl } from './EditorItalicControl';
import { EditorStrikethroughControl } from './EditorStrikethroughControl';
import { EditorMonospaceControl } from './EditorMonospaceControl';
import { EditorHeadingControl } from './EditorHeadingControl';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { CodeNode, CodeHighlightNode } from '@lexical/code';
import { ListNode, ListItemNode } from '@lexical/list';
import { EditorQuoteControl } from './EditorQuoteControl';
import { EditorCodeControl } from './EditorCodeControl';
import CodeHighlightPlugin from './CodeHightlightPlugin';
import { EditorListControl } from './EditorListControl';
import { cn } from '../utils/cn';
import { TextArea } from './TextArea';
import { Icon } from './Icon';

interface IProps {
  markdown: string;
  onChange?: (value: string) => void;
}

export const MarkdownEditor: FC<IProps> = ({ markdown, onChange }) => {
  const [isPlaintextMode, setIsPlaintextMode] = useState(false);
  const [text, setText] = useState(markdown);

  const initialConfig: InitialConfigType = {
    editorState: () => $convertFromMarkdownString(text, TRANSFORMERS),
    onError: (e) => {
      throw e;
    },
    theme: {
      text: {
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline',
        strikethrough: 'line-through',
        underlineStrikethrough: 'underline line-through',
      },
      heading: {
        h1: 'text-2xl',
        h2: 'text-xl',
        h3: 'text-lg',
      },
      quote: 'border-white/10 border rounded-lg p-4',
      code: 'block border border-[#383A3B] rounded-lg font-code py-4 after:pointer-events-none pl-16 pr-4 relative before:block before:content-[attr(data-gutter)] before:absolute before:left-0 before:top-0 before:p-4 before:text-right before:min-w-[3rem] after:block after:absolute after:-right-[1px] after:-top-[1px] after:-bottom-[1px] after:left-12 after:bg-black/5 after:content-[""] after:border after:rounded-lg after:border-[#383A3B]',
      codeHighlight: {
        atrule: 'PlaygroundEditorTheme__tokenAttr',
        attr: 'text-lime-400',
        boolean: 'PlaygroundEditorTheme__tokenProperty',
        builtin: 'PlaygroundEditorTheme__tokenSelector',
        cdata: 'PlaygroundEditorTheme__tokenComment',
        char: 'PlaygroundEditorTheme__tokenSelector',
        class: 'PlaygroundEditorTheme__tokenFunction',
        'class-name': 'PlaygroundEditorTheme__tokenFunction',
        comment: 'PlaygroundEditorTheme__tokenComment',
        constant: 'PlaygroundEditorTheme__tokenProperty',
        deleted: 'PlaygroundEditorTheme__tokenProperty',
        doctype: 'PlaygroundEditorTheme__tokenComment',
        entity: 'PlaygroundEditorTheme__tokenOperator',
        function: 'PlaygroundEditorTheme__tokenFunction',
        important: 'PlaygroundEditorTheme__tokenVariable',
        inserted: 'PlaygroundEditorTheme__tokenSelector',
        keyword: 'text-lime-400',
        namespace: 'PlaygroundEditorTheme__tokenVariable',
        number: 'PlaygroundEditorTheme__tokenProperty',
        operator: 'PlaygroundEditorTheme__tokenOperator',
        prolog: 'PlaygroundEditorTheme__tokenComment',
        property: 'PlaygroundEditorTheme__tokenProperty',
        punctuation: 'PlaygroundEditorTheme__tokenPunctuation',
        regex: 'PlaygroundEditorTheme__tokenVariable',
        selector: 'PlaygroundEditorTheme__tokenSelector',
        string: 'PlaygroundEditorTheme__tokenSelector',
        symbol: 'PlaygroundEditorTheme__tokenProperty',
        tag: 'PlaygroundEditorTheme__tokenProperty',
        url: 'PlaygroundEditorTheme__tokenOperator',
        variable: 'PlaygroundEditorTheme__tokenVariable',
      },
      list: {
        ol: 'list-decimal pl-8',
        ul: 'list-disc pl-8',
        listitem: 'before:block before:content-[*]',
        listitemChecked: 'bg-white',
        listitemUnchecked: 'bg-red',
      },
    },
    namespace: 'Editor',
    nodes: [HeadingNode, QuoteNode, CodeNode, CodeHighlightNode, ListNode, ListItemNode],
  };

  if (isPlaintextMode) {
    return (
      <>
        <button
          type='button'
          className={cn(
            'self-end rounded-lg border border-transparent bg-white/5 p-2 transition-colors hover:border-white/10 hover:bg-white/5'
          )}
          onClick={() => setIsPlaintextMode(false)}
        >
          <Icon type='visible' className='text-primary' />
        </button>
        <TextArea
          className='font-code
                    [&:hover::-webkit-scrollbar-thumb]:bg-grey-300
                    resize-y
                    overflow-y-scroll
                    [&::-webkit-scrollbar-thumb]:rounded
                    [&::-webkit-scrollbar-thumb]:bg-transparent
                  [&::-webkit-scrollbar-thumb]:transition-colors [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:opacity-0'
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            onChange?.(e.target.value);
          }}
        />
      </>
    );
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className='flex flex-col gap-4'>
        <div className={cn('flex items-center justify-between')}>
          <div className='flex items-center'>
            <EditorBoldControl />
            <EditorItalicControl />
            <EditorStrikethroughControl />
            <EditorMonospaceControl />
            <EditorHeadingControl />
            <EditorCodeControl />
            <EditorQuoteControl />
            <EditorListControl />
          </div>
          <button
            type='button'
            className={cn(
              'rounded-lg border border-transparent p-2 transition-colors hover:border-white/10 hover:bg-white/5'
            )}
            onClick={() => setIsPlaintextMode(true)}
          >
            <Icon type='visible' />
          </button>
        </div>
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className={cn([
                'prose',
                'prose-default',
                'prose-no-margin',
                'prose-h1:text-2xl',
                'prose-h2:text-xl',
                'prose-h3:text-lg',
                'prose-headings:mb-4',
                'prose-blockquote:not-italic',
                'prose-code:font-normal',
                'prose-code:text-[0.8125rem]',
                'p-4',
                'font-sans',
                'text-[0.8125rem]',
                'leading-normal',
                'rounded-lg',
                'border',
                'border-white/10',
                'outline-none',
                'bg-transparent',
                'text-text-primary',
                'resize',
                'transition-colors',
                'max-w-full',
                'placeholder:text-foreground-secondary',
                'disabled:opacity-50',
                '[&:not(:disabled)]:hover:bg-white/5',
                '[&:not(:disabled)]:focus:bg-black/10',
                '[&:not(:disabled)]:focus:border-primary-default',
              ])}
            />
          }
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <ListPlugin />
        <CodeHighlightPlugin />
        <OnChangePlugin
          ignoreSelectionChange
          ignoreHistoryMergeTagChange
          onChange={(editorState) => {
            editorState.read(() => {
              const md = $convertToMarkdownString(TRANSFORMERS);
              setText(md);
              onChange?.(md);
            });
          }}
        />
      </div>
    </LexicalComposer>
  );
};
