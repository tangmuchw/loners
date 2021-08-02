import videojs from 'video.js';

const MyPlaybackRateMenuButton = videojs.extend(videojs.getComponent('PlaybackRateMenuButton'), {
  playbackRates() {
    return ['0.5', '1.0', '1.8', '3.0', '5.0'];
  },
});

videojs.registerComponent('MyPlaybackRateMenuButton', MyPlaybackRateMenuButton);
