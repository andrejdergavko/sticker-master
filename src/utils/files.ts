export const getFileFormatFromPath = (path: string) => {
  return path.split('.').pop();
};
