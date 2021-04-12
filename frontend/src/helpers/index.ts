/**
 * Helper functions
 */
import dayjs from 'dayjs';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export const formatDateToYMD = (date: Date): string => {
  return dayjs(date).format('YYYY-MM-DD');
};

export const renderFontAwesomeIcons = (): void => {
  library.add(faTrash, faEdit);
};

export const transformID = (id: number | string) => {
  const padding = '000000';
  const studentIdLength = id.toString().length;
  return 'STUDENT-' + (padding.substr(studentIdLength) + id);
};
