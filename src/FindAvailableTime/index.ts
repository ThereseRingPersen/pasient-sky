import { appointments, allTimeSlots } from './data';
import {
  findAllBookedIntervals,
  allAvailable,
  findAvailableTimeSlots,
} from './utils';
import { CalendarInterval } from './types';

export function findAvailableTime(
  calendarIds: string[],
  periodToSearch: string,
  duration: number,
  timeSlotTypeUuid: string[]
) {
  const timeInterval = periodToSearch.split('/');
  const start = timeInterval[0].replace('Z', '');
  const end = timeInterval[1].replace('Z', '');

  const booked: CalendarInterval[] = findAllBookedIntervals(
    appointments,
    calendarIds,
    start,
    end
  );
  const availableTimes: CalendarInterval[] = allAvailable(
    booked,
    start,
    end,
    duration
  );
  const timeSlots = findAvailableTimeSlots(
    allTimeSlots,
    calendarIds,
    timeSlotTypeUuid
  );
  return { availableTimes, timeSlots };
}
