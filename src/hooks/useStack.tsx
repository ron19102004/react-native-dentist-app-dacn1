import { useState, useCallback } from "react";

interface UseStack<T> {
  push(t: T): void;
  pop(): T | undefined;
  isEmpty(): boolean;
  size(): number;
  stack: T[];
}

const useStack = <T,>(): UseStack<T> => {
  const [stack, setStack] = useState<T[]>([]);

  const push = useCallback((t: T) => {
    setStack(prevStack => [...prevStack, t]);
  }, []);

  const pop = useCallback((): T | undefined => {
    let poppedValue: T | undefined;
    setStack(prevStack => {
      if (prevStack.length === 0) return prevStack;
      const newStack = [...prevStack];
      poppedValue = newStack.pop();
      return newStack;
    });
    return poppedValue;
  }, []);

  const isEmpty = useCallback(() => stack.length === 0, [stack]);

  const size = useCallback(() => stack.length, [stack]);

  return { push, pop, isEmpty, size, stack };
};

export default useStack;
