import { FC } from 'react';
import Markdown, { Components } from 'react-markdown';
import './MarkdownDisplay.css';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { cn } from '@/shared/utils/cn';

interface MarkdownDisplayProps {
  markdown: string;
}

const components: Partial<Components> = {
  code: ({ children, ...props }) => {
    const text = children!.toString();

    const gutter = Array.from({ length: text.match(/\n/gi)?.length || 0 }, (_, k) => k + 1).join(
      '\n'
    );

    return (
      <code data-gutter={gutter} {...props}>
        {children}
      </code>
    );
  },
};

export const MarkdownDisplay: FC<MarkdownDisplayProps> = ({ markdown }) => {
  return (
    <Markdown
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
      className={cn(
        'markdown-display',
        'w-full',
        'max-w-none',
        'prose',
        'prose-default',
        'prose-no-margin',
        'prose-h1:text-4xl',
        'prose-h2:text-3xl',
        'prose-h3:text-2xl',
        'prose-blockquote:not-italic',
        'prose-code:font-normal',
        'prose-code:text-[0.8125rem]'
      )}
      components={components}
    >
      {markdown}
    </Markdown>
  );
};
