import _ from 'lodash';
import parse from 'date-fns/parse';
import isValid from 'date-fns/isValid';
import format from 'date-fns/format';
import startOfDay from 'date-fns/startOfDay';
import isBefore from 'date-fns/isBefore';
import isAfter from 'date-fns/isAfter';
import formatInTimeZone from 'date-fns-tz/formatInTimeZone';
import { ApiDateFormat, API_SERVER_TIME_ZONE } from '@/config/api';


/** @function
 * 转换为日期
 * @param {(string|number)} dateString - 要解析的字符串或数字
 * @param {string} [formatString="yyyy-MM-dd'T'HH:mm:ssxxx"] - 转换的格式
 * @returns {(Date|undefined)} 日期
 */
export function dateConvert(dateString, formatString = ApiDateFormat.DATE_TIME) {
  if (dateString instanceof Date) {
    return dateString;
  }

  if (typeof dateString === 'string') {
    const date = parse(dateString, formatString, new Date());
    if (isValid(date)) {
      return date;
    }
  } else if (typeof dateString === 'number') {
    const date = new Date(dateString);
    if (isValid(date)) {
      return date;
    }
  }

  return undefined;
}

/** @function
 * 日期格式化（本地时区）
 * @param {(Date|string|number)} dateString - 要格式化的字符串或数字日期
 * @param {string} destFormatString - 输出时的格式
 * @param {string} [parseFormatString="yyyy-MM-dd'T'HH:mm:ssxxx"] - 转换时的格式
 * @returns {string} 日期格式化后的字符串
 */
export function dateFormat(
  dateString,
  destFormatString,
  parseFormatString = ApiDateFormat.DATE_TIME,
) {
  const date = dateConvert(dateString, parseFormatString);
  if (isValid(date)) {
    return format(date, destFormatString);
  }

  return '';
}

export const dateFormatCR = _.curryRight(dateFormat);

/** @function
 * 日期格式化（带服务器时区，固定在+8000时区）
 * @param {(Date|string|number)} dateString - 要格式化的字符串或数字日期
 * @param {string} destFormatString - 输出时的格式
 * @param {string} [parseFormatString="yyyy-MM-dd'T'HH:mm:ssxxx"] - 转换时的格式
 * @param {string} [serverTimeZone="Asia/Shanghai"] - 转换时的服务器时区
 * @returns {string} 日期格式化后的字符串
 */
export function dateFormatSTZ(
  dateString,
  destFormatString,
  parseFormatString = ApiDateFormat.DATE_TIME,
  serverTimeZone = API_SERVER_TIME_ZONE,
) {
  const date = dateConvert(dateString, parseFormatString);
  if (isValid(date)) {
    return formatInTimeZone(date, serverTimeZone, destFormatString);
  }

  return '';
}

export const dateFormatSTZCR = _.curryRight(dateFormatSTZ);

// 提取小时分钟方法
export function extractHourMinute(timeString) {
  const regex = /(\d{2}:\d{2})(:\d{2})?/;
  const matched = regex.exec(timeString);
  if (matched?.length > 1) {
    return matched[1];
  }

  return '';
}

// 日期字符串补秒和时间
export function padRightMinuteTimeZone(dateString) {
  return `${dateString}:00+08:00`;
}

export function isBeforeDay(date1, date2) {
  if (!(isValid(date1) && isValid(date2))) {
    return false;
  }

  const d1 = startOfDay(date1);
  const d2 = startOfDay(date2);

  return isBefore(d1, d2);
}

export function isAfterDay(date1, date2) {
  if (!(isValid(date1) && isValid(date2))) {
    return false;
  }

  const d1 = startOfDay(date1);
  const d2 = startOfDay(date2);

  return isAfter(d1, d2);
}
