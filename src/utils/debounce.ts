/**
 * Returns a debounced version of the provided function that delays invoking until after `wait` ms have elapsed since the last call.
 * @param fn The function to debounce
 * @param wait The number of milliseconds to delay
 * @returns A debounced function
 */

type MaybePromise<T> = T | Promise<T>;

type Debounced<Args extends unknown[], R> = ((...args: Args) => Promise<R>) & {
  cancel: () => void;
};

export function debounce<Args extends unknown[], R>(
  fn: (...args: Args) => MaybePromise<R>,
  wait: number
): Debounced<Args, R> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let pending: Promise<R> | undefined;
  let resolveFn: ((value: R | PromiseLike<R>) => void) | undefined;

  const debounced = (...args: Args): Promise<R> => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    if (!pending) {
      pending = new Promise<R>((resolve) => {
        resolveFn = resolve;
      });
    }
    timeoutId = setTimeout(() => {
      Promise.resolve(fn(...args)).then((result) => {
        if (resolveFn) {
          resolveFn(result);
          resolveFn = undefined;
          pending = undefined;
        }
      });
    }, wait);
    return pending;
  };

  debounced.cancel = () => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
    if (resolveFn) {
      // Optionally, resolve with undefined if cancelled (type-safe for void)
      resolveFn(undefined as R);
      resolveFn = undefined;
      pending = undefined;
    }
  };

  return debounced;
}
