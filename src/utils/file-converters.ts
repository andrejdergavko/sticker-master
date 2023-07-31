import xlsx from 'xlsx';
import fs from 'fs';
import iconv from 'iconv-lite';

export const convertFileToString = (path: string): string => {
  try {
    const extension = path.split('.').pop();

    if (extension === 'xls') {
      return convertXlsToCsv(path);
    }

    if (extension === 'csv') {
      const data = fs.readFileSync(path);
      return iconv.decode(data, 'cp1251').toString();
    }

    return '';
  } catch (error) {
    throw new Error('An error occurred while converting the file');
  }
};

export const convertXlsToCsv = (path: string): string => {
  const xlsFile = xlsx.readFile(path, { codepage: 1251 });
  const sheetValue = xlsFile.Sheets[xlsFile.SheetNames[0]];
  return xlsx.utils.sheet_to_csv(sheetValue);
};
