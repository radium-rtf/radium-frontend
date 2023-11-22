import { FC } from 'react';
import Markdown, { Components } from 'react-markdown';
import './MarkdownDisplay.css';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

interface MarkdownDisplayProps {
  markdown: string;
}

const components: Partial<Components> = {
  code: ({ node, children, ...props }) => {
    const text = children!.toString();
    console.log(node?.type);

    const gutter = Array.from(
      { length: text.match(/\n/gi)?.length || 0 },
      (_, k) => k + 1
    ).join('\n');
    console.log(gutter);

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
      className={'markdown-display text-4'}
      components={components}
    >
      {markdown}
    </Markdown>
  );
};