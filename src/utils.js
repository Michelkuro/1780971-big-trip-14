import dayjs from 'dayjs';

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const isDateFormat = (date, format) => {
  return date !== null ? dayjs(date).format(format) : '';
};
