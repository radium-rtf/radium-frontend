'use client';
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface IUseDropProps {
  onDrop?: (event: Event) => void;
}

interface IUseDropResult {
  isDraggable: boolean;
  ref: MutableRefObject<Document | null>;
}

export const useDrop = (props: IUseDropProps = {}): IUseDropResult => {
  const { onDrop } = props;

  const droppableRef = useRef<Document>(null);
  const overRef = useRef<boolean>(false);
  const timerId = useRef<NodeJS.Timeout>();
  const [isDraggable, setIsDraggable] = useState<boolean>(false);

  const clearTimer = useCallback(() => {
    timerId.current && clearTimeout(timerId.current);
  }, []);

  const handleDragOver = useCallback(
    (event: { preventDefault: () => void }) => {
      event.preventDefault();
      setIsDraggable(true);

      clearTimer();
      timerId.current = setTimeout(() => {
        overRef.current = false;
        setIsDraggable(false);
      }, 200);
    },
    [clearTimer]
  );

  const preventDefault = useCallback(
    (event: { preventDefault: () => void; stopPropagation: () => void }) => {
      event.preventDefault();
      event.stopPropagation();
    },
    []
  );

  const handleDrop = useCallback(
    (event: Event) => {
      preventDefault(event);
      setIsDraggable(false);
      overRef.current = false;

      onDrop?.(event);
    },
    [preventDefault, onDrop]
  );

  useEffect(() => {
    const ref = droppableRef.current;

    if (!ref) {
      return;
    }

    ref.addEventListener('dragenter', preventDefault);
    ref.addEventListener('dragleave', preventDefault);
    ref.addEventListener('dragover', handleDragOver);
    ref.addEventListener('drop', handleDrop);

    return () => {
      ref.removeEventListener('dragenter', preventDefault);
      ref.removeEventListener('dragleave', preventDefault);
      ref.removeEventListener('dragover', handleDragOver);
      ref.removeEventListener('drop', handleDrop);
    };
  }, [handleDrop, handleDragOver, preventDefault]);

  return { isDraggable, ref: droppableRef };
};
