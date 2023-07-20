import xlsx from 'xlsx';

export const convertFileToCsv = (path: string): string => {
  const extension = path.split('.').pop();

  if (extension === 'xls') {
    return convertXlsToCsv(path);
  }

  return '';
};

export const convertXlsToCsv = (path: string): string => {
  const xlsFile = xlsx.readFile(path);
  const sheetValue = xlsFile.Sheets[xlsFile.SheetNames[0]];
  return xlsx.utils.sheet_to_csv(sheetValue);
};
