import isBefore from 'date-fns/isBefore';
import isToday from 'date-fns/isToday';
import startOfMonth from 'date-fns/startOfMonth';
import previousSunday from 'date-fns/previousSunday';
import addDays from 'date-fns/addDays';
import isSameMonth from 'date-fns/isSameMonth';
import startOfWeek from 'date-fns/startOfWeek';
import isSameDay from 'date-fns/isSameDay';
import isSunday from 'date-fns/isSunday';

function getDateItem(d, date, selectedDate) {
  return {
    d,
    date: d.getDate(),
    isToday: isToday(d),
    hasDot: true, // TODO:判断当日是否有活动
    isPast: isBefore(d, new Date()),
    isSameMonth: isSameMonth(date, d),
    isSelect: isSameDay(selectedDate, d),
  };
}

/**
 * @param date
 * @returns {Array}
 */
export const getFullMonDays = (date, selectedDate) => {
  const firstMonthDay = startOfMonth(date);
  let firstFortyTwoDay;
  if (isSunday(firstMonthDay)) {
    firstFortyTwoDay = firstMonthDay;
  } else {
    firstFortyTwoDay = previousSunday(firstMonthDay);
  }

  const days = [];
  for (let i = 0; i < 42; i += 1) {
    const d = addDays(firstFortyTwoDay, i);

    if (!isSameMonth(d, date) && isBefore(date, d)) {
      break;
    }

    days.push(getDateItem(d, date, selectedDate));
  }
  return days;
};

export const getThisWeekDays = (date, selectedDate) => {
  const firstDayOfWeek = startOfWeek(date);

  const days = [];

  for (let i = 0; i < 7; i += 1) {
    const d = addDays(firstDayOfWeek, i);

    days.push({
      ...getDateItem(d, date, selectedDate),
      isSameMonth: true,
    });
  }

  return days;
};
