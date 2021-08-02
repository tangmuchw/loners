export const QUALITY_LEVEL_MAP = new Map([
  ['ld', '流畅'],
  ['sd', '标清'],
  ['hd', '高清'],
  ['fhd', '1080P'],
]);

export const STATUS_DESCRIPTION = {
  error: '深感抱歉，加载视频失败，请检查网络或刷新网页！',
};

export const BASIC_PLAYER_OPTION = {
  controls: true,

  preload: 'none',

  fluid: true,

  language: 'zh-CN',

  controlBar: {
    volumePanel: {
      inline: false,
    },
    currentTimeDisplay: false,
    timeDivider: false,
    durationDisplay: false,
    remainingTimeDisplay: false,
    pictureInPictureToggle: false,
  },

  sources: [],
  qualityLevels: [],

  aspectRatio: '16:9',
};
