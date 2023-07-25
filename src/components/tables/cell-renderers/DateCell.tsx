import type { FC } from 'react';
import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

type DateCellProps = {
  date?: string;
};

const DateCell: FC<DateCellProps> = ({ date }) => {
  return (
    <div>
      {date &&
        format(new Date(date), 'd MMMM yyyy, HH:mm', { locale: ruLocale })}
    </div>
  );
};

export default DateCell;
