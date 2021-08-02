import type { PlayerSource, PlayerSourceAttr } from '../interface';

type AudioPreload = 'auto' | 'none' | 'meta';

export interface AudioPlayerProps {
  id: string;
  className?: string;
  sources?: PlayerSource;
  source?: PlayerSourceAttr;
  preload?: AudioPreload;
}
