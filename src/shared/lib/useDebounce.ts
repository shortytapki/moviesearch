import { useEffect, useState } from 'react';

const createDebouncer = (fn: Function, ms?: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms || 1000);
  };
};

export const useDebounce = <T>(
  initialValue: T,
  delay?: number,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setter] = useState(initialValue);
  const debouncedSetter = createDebouncer(setter, delay);
  useEffect(() => {
    debouncedSetter(value);
  }, [value]);

  return [value, debouncedSetter];
};
