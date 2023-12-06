import { cn } from '../utils/cn';
import { Icon } from './Icon';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection } from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import { $createQuoteNode } from '@lexical/rich-text';

export const EditorQuoteControl = () => {
  const [editor] = useLexicalComposerContext();

  const clickHandler = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  };

  return (
    <button
      type='button'
      className={cn(
        'rounded-lg border border-transparent p-2 transition-colors hover:border-white/10 hover:bg-white/5'
      )}
      onClick={clickHandler}
    >
      <Icon type='quote' />
    </button>
  );
};
