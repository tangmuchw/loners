import videojs from 'video.js';

const UPDATE_CURRENT_TIME_EVENT = 'update_current_time';

const messageHandler = (data: VideoMessageEventData) => {
  const { type, id, currentTime } = data;
  if (!type) return;

  if (type === UPDATE_CURRENT_TIME_EVENT && id) {
    // 设置 video 跳转到某个时刻播放
    const videoPlayer = videojs(id);
    videoPlayer.currentTime(currentTime);
    videoPlayer.play();
  }
};

type MessageEventType = typeof UPDATE_CURRENT_TIME_EVENT;

type VideoMessageEventData = {
  type: MessageEventType;
  id: string;

  // The time to seek to in seconds
  currentTime: number;
};

interface VideoMessageEvent extends MessageEvent {
  data: VideoMessageEventData;
  originalEvent?: {
    origin?: string;
  };
}

export const subscribeVideoMessage = (event: VideoMessageEvent): void => {
  // For Chrome, the origin property is in the event.originalEvent
  const origin = event.origin || event.originalEvent?.origin;
  const localOrigin = window.location?.origin;

  if (origin === localOrigin) {
    messageHandler(event.data);
  }
};

export const publishVideoPositionMessage = (id: string, currentTime: number) => {
  if (!id) return;

  window.postMessage(
    {
      type: UPDATE_CURRENT_TIME_EVENT,
      id,
      currentTime,
    },
    window.location.origin,
  );
};
