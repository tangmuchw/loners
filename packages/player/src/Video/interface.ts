import type { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';
import type { PlayerSource } from '../interface';

export interface VideoPlayerProps {
  id: string;
  sources?: PlayerSource | { src: string; type: string }[];

  options?: VideoJsPlayerOptions;

  defaultVolume?: number;

  defaultPlayBackRate?: number;

  autoplay?: boolean;

  /** 海报图 */
  poster?: string;

  /** 清晰度选择 */
  showQuality?: boolean;

  /** 翻转功能 */
  showRotate?: boolean;

  /** 倍速功能 */
  showBackRate?: boolean;

  /** 快捷键功能 */
  needHotKeys?: boolean;

  needPauseMeSmartly?: boolean;

  showDurationDisplay?: boolean;

  /** 已初始化 player 后的自定义一些操作 */
  onInitialize?: (player: VideoJsPlayer) => any;

  onError?: () => any;
}
