import moment from 'moment';

/**
 * @param seconds 为数字时，代表时间戳，单位为: s
 * @param rule
 */
export const formatTime = (seconds?: string | number, rule = 'YYYY-MM-DD HH:mm:ss') => {
  if (!seconds) return '';

  if (typeof seconds === 'number') return moment(seconds * 1000).format(rule);

  return moment(seconds, 'YYYYMMDDHHmmss').format(rule);
};

export const isMobile = () => /(iPhone|iPad|iPod|iOS|Android)/i.test(window.navigator.userAgent);

/** 格式化数字为 xxx,xxx,xxx */
export const formatNumToThousands = (value?: number) => {
  if (value === undefined || value === null) return '';

  return !Number.isNaN(value)
    ? value?.toString().replace(new RegExp(/(?<=-?\d)(?=(\d{3})+(\.{1}\d+)?$)/, 'g'), ',')
    : value;
};
