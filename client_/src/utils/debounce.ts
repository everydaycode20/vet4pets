import { useEffect, useState } from "react";

export default function Debounce(
  function_: (e: any) => void,
  wait: number = 300
) {
  let timer: ReturnType<typeof setTimeout> | undefined = undefined;

  if (typeof function_ !== "function") {
    throw new TypeError("should be a function");
  }

  return (e?: any) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      function_(e);
    }, wait);
  };
}

export function useDebounce(value: any, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}
