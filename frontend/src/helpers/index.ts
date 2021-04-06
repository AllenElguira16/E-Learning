/**
 * Helper functions
 */
import dayjs from 'dayjs';

export const formatDateToYMD = (date: Date) => {
  return dayjs(date).format('YYYY-MM-DD');
};
