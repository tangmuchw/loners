export interface LonersScripts {
  formatTime: (seconds?: string | number, rule?: string) => string;
  isMobile: () => boolean;
  formatNumToThousands: (num?: number) => string;
}
