import type { AudioPlayerProps } from './interface';
import type { PlayerSourceAttr } from '../interface';

export const getAudioSources = (sources?: AudioPlayerProps['sources']) => {
  if (!sources) return [];

  const videoSources = Object.values(sources)?.map(({ play_url, format }: PlayerSourceAttr) => ({
    src: `${play_url}.${format}`,
    type: `audio/${format}`,
  }));

  return videoSources;
};
