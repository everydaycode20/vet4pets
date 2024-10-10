import { ChangeEvent } from "react";

export default function Debounce(
  function_: (e: any) => void,
  wait: number = 300
) {
  let timer: ReturnType<typeof setTimeout> | undefined = undefined;

  if (typeof function_ !== "function") {
    throw new TypeError("should be a function");
  }

  return (e: any) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      function_(e);
    }, wait);
  };
}
