import {appInfo} from '../constants/appInfos';
import {numberToString} from './numberToString';

export class DateTime {
  static GetTime = (num: Date) => {
    const date = new Date(num);

    return `${numberToString(date.getHours())}:${numberToString(
      date.getMinutes(),
    )}`;
  };
  static GetDate = (num: Date) => {
    const date = new Date(num);

    return `${numberToString(date.getDate())} ${
      appInfo.monthNames[date.getMonth()]
    }, ${date.getFullYear()}`;
  };

  static GetDayString = (num: number) => {
    const date = new Date(num);

    return `${appInfo.dayNames[date.getDay()]}, ${
      appInfo.monthNames[date.getMonth()]
    } ${numberToString(date.getDate())}`;
  };

  static GetStartAndEnd = (start: number, end: number) => {
    const dateStart = new Date(start);
    const dateEnd = new Date(end);

    return `${numberToString(dateStart.getHours())}:${numberToString(
      dateStart.getMinutes(),
    )} - ${numberToString(dateEnd.getHours())}:${numberToString(
      dateEnd.getMinutes(),
    )}`;
  };
}
