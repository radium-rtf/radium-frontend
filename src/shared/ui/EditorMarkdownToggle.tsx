import { useCallback } from 'react';
import { cn } from '../utils/cn';
import { Icon } from './Icon';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createTextNode, $getRoot } from 'lexical';
import { $isCodeNode, $createCodeNode } from '@lexical/code';
import { $convertFromMarkdownString, $convertToMarkdownString } from '@lexical/markdown';
import { TRANSFORMERS } from '../utils/TRANSFORMERS';

export const EditorMarkdownToggle = () => {
  const [editor] = useLexicalComposerContext();

  const clickHandler = useCallback(() => {
    editor.update(() => {
      const root = $getRoot();
      const firstChild = root.getFirstChild();
      if ($isCodeNode(firstChild) && firstChild.getLanguage() === 'markdown') {
        $convertFromMarkdownString(firstChild.getTextContent(), TRANSFORMERS);
      } else {
        const markdown = $convertToMarkdownString(TRANSFORMERS);
        root.clear().append($createCodeNode('markdown').append($createTextNode(markdown)));
      }
      root.selectEnd();
    });
  }, [editor]);

  return (
    <button
      type='button'
      className={cn(
        'rounded-lg border border-transparent p-2 transition-colors hover:border-white/10 hover:bg-white/5'
      )}
      onClick={clickHandler}
    >
      <Icon type='visible' />
    </button>
  );
};
