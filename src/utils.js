import dayjs from 'dayjs';

export const isDateFormat = (date, format) => {
  return date !== null ? dayjs(date).format(format) : '';
};
