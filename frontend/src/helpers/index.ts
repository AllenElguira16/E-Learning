/**
 * Helper functions
 */
import dayjs from 'dayjs';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEdit,
  faTrash,
  faPlay,
  faPause,
  faExpand,
  faCompress,
  faVolumeUp,
  faFile
} from '@fortawesome/free-solid-svg-icons';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const formatDateToYMD = (date: Date): string => {
  return dayjs(date).format('YYYY-MM-DD');
};

export const secondsTo60MinFormat = (time: number | undefined) => {
  if (!time) return '00:00';

  let minutes: string | number = Math.floor(time / 60);
  let seconds: string | number = Math.ceil(time - minutes * 60);

  if (seconds.toLocaleString().length === 1) {
    seconds = `0${seconds}`;
  }

  if (minutes.toLocaleString().length === 1) {
    minutes = `0${minutes}`;
  }

  return `${minutes}:${seconds}`;
};

export const renderFontAwesomeIcons = (): void => {
  library.add(faTrash, faEdit, faPlay, faPause, faVolumeUp, faExpand, faCompress, faFile);
};
