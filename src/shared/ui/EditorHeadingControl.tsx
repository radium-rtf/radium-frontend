import { cn } from '../utils/cn';
import { Icon } from './Icon';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createParagraphNode, $getSelection, $isRangeSelection } from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import { $createHeadingNode, HeadingTagType } from '@lexical/rich-text';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './Dropdown';

export const EditorHeadingControl = () => {
  const [editor] = useLexicalComposerContext();

  const clickHandler = (blockType: HeadingTagType | 'paragraph') => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        if (blockType === 'paragraph') {
          $setBlocksType(selection, () => $createParagraphNode());
        } else {
          $setBlocksType(selection, () => $createHeadingNode(blockType));
        }
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type='button'
          className={cn(
            'rounded-lg border border-transparent p-2 transition-colors hover:border-white/10 hover:bg-white/5'
          )}
        >
          <Icon type='heading' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => clickHandler('paragraph')}>Параграф</DropdownMenuItem>
        <DropdownMenuItem onClick={() => clickHandler('h1')}>Заголовок 1</DropdownMenuItem>
        <DropdownMenuItem onClick={() => clickHandler('h2')}>Заголовок 2</DropdownMenuItem>
        <DropdownMenuItem onClick={() => clickHandler('h3')}>Заголовок 3</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
