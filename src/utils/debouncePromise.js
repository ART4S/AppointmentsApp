export default function debouncePromise(fn, wait) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    return new Promise((resolve, reject) => {
      timer = setTimeout(
        () =>
          fn(...args).then(
            (data) => resolve(data),
            (error) => reject(error),
          ),
        wait,
      );
    });
  };
}
