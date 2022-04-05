function objectSlicer(obj, start: number, end?: number | undefined) {
  return Object.keys(obj)
    .slice(start, end)
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
}

export { objectSlicer };
