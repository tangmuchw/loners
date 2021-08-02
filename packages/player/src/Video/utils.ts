import type { QualityLevels, QualityLevel, PlayerSourceAttr } from '../interface';
import type { VideoPlayerProps } from './interface';
import { QUALITY_LEVEL_MAP } from './constants';

export const getQualityLevels = (sources?: VideoPlayerProps['sources']) => {
  if (!sources || Array.isArray(sources)) return [];

  const qualityLevels = Object.entries(sources)?.map(
    ([identify = 'ld', { play_url, format, duration }]: [any, any], idx) => ({
      label: QUALITY_LEVEL_MAP.get(identify) || '流畅',
      selected: idx === 0,
      identify,
      type: `video/${format}`,
      src: play_url,
      duration,
    }),
  );

  return qualityLevels;
};

export const getDefaultDuration = (qualityLevels?: QualityLevels) => {
  if (!qualityLevels?.length) return -1;

  const { duration = 0 } = qualityLevels?.find(({ selected }: QualityLevel) => selected) || {};

  return duration;
};

export const isVisibleInViewport = (el: any) => {
  if (!el) return false;

  const { top, bottom, left, right, height } = el?.getBoundingClientRect() || {};
  const clientWidth = window.innerWidth || document.documentElement.clientWidth;
  const clientHeight = window.innerHeight || document.documentElement.clientHeight;

  return (
    (top >= 0 || height + top >= 0) && left >= 0 && bottom <= clientHeight && right <= clientWidth
  );
};

export const getVideoSources = (sources?: VideoPlayerProps['sources']) => {
  if (!sources) return [];

  if (Array.isArray(sources)) return sources;

  const videoSources = Object.values(sources)?.map(({ play_url, format }: PlayerSourceAttr) => ({
    src: play_url,
    type: `video/${format}`,
  }));

  return videoSources;
};
