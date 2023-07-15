import xlsx from 'xlsx';

export const convertXlsToCsv = (path: string) => {
  const xlsFile = xlsx.readFile(path);
  const sheetValue = xlsFile.Sheets[xlsFile.SheetNames[0]];
  return xlsx.utils.sheet_to_csv(sheetValue);
};
