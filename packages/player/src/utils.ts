import type { Duration } from 'moment';

const replaceDuration = (duration: number) => {
  if (Number.isNaN(duration)) return 'xx';

  return duration < 10 ? `0${duration}` : duration;
};

export const formatDuration = (duration: Duration) => {
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  return hours < 1
    ? `${replaceDuration(minutes)}:${replaceDuration(seconds)}`
    : `${replaceDuration(hours)}:${replaceDuration(minutes)}:${replaceDuration(seconds)}`;
};
