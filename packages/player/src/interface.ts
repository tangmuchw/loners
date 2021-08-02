type MediaType = 'ld' | 'sd' | 'hd' | 'fhd';

export interface PlayerSourceAttr {
  bitrate: number;
  duration: number;
  format: string; // 视频格式
  height: number;
  play_url: string;
  size: number;
  width: number;
}

export type PlayerSource = {
  [key in MediaType]: PlayerSourceAttr;
};

export interface QualityLevel extends Partial<PlayerSourceAttr> {
  label: string;
  identify: string;
  src: string;
  selected: boolean;
  duration: number;
}

export type QualityLevels = QualityLevel[];

export type MediaSources = {
  src?: string;
  type: string;
}[];
