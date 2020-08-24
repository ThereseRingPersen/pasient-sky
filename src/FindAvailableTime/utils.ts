import { CalendarInterval } from './types';

export function findAllBookedIntervals(
  appointments: any,
  calendarIds: string[],
  start: string,
  end: string
): CalendarInterval[] {
  const booked: CalendarInterval[] = appointments
    .filter((appointment) => {
      return calendarIds.includes(appointment.calendar_id);
    })
    .filter((appointment) => {
      return appointment.start < end && appointment.end > start;
    })
    .map((appointment) => {
      return {
        calendarId: appointment.calendar_id,
        start: appointment.start,
        end: appointment.end,
      } as CalendarInterval;
    });
  return booked;
}

export function findAvailableTimeSlots(
  timeSlots: any,
  calendarIds: string[],
  timeSlotTypeUuids: string[]
) {
  return timeSlots.filter((timeSlot) => {
    return (
      timeSlotTypeUuids.includes(timeSlot.type_id) &&
      calendarIds.includes(timeSlot.calendar_id)
    );
  });
}

export function allAvailable(
  booked: CalendarInterval[],
  start: string,
  end: string,
  duration: number
): CalendarInterval[] {
  const intervals: CalendarInterval[] = [];
  if (booked.length === 0) {
    return [];
  } else {
    intervals.push(...findIntervalsBetweenAppointments(booked, end));

    const allIntervals: CalendarInterval[] = [];
    intervals.forEach((calendarInterval, index) => {
      const next = intervals[index + 1] ? intervals[index + 1].start : end;
      const hasTime = findMinutes(calendarInterval.end, next);
      if (hasTime >= duration) {
        allIntervals.push({
          calendarId: calendarInterval.calendarId,
          start: calendarInterval.end,
          end: next,
          minutes: hasTime,
        });
      }
    });
    const firstElement = allIntervals[0];
    if (firstElement.start > start) {
      allIntervals.unshift({
        calendarId: firstElement.calendarId,
        start: start,
        end: firstElement.start,
        minutes: findMinutes(start, firstElement.start),
      });
    }
    return allIntervals;
  }
}

export function findIntervalsBetweenAppointments(
  booked: CalendarInterval[],
  end: string
) {
  return booked.filter((item, index) => {
    const next = booked[index + 1] ? booked[index + 1].start : end;
    return next.localeCompare(item.end) > 0;
  });
}

function findMinutes(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = end.getTime() - start.getTime();
  const min = Math.floor(diff / 60000);
  return min;
}
