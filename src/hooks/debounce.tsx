export function debounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
