/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { FrownOutlined } from '@ant-design/icons';
import cx from 'classnames';
import videojs from 'video.js';
import './QualitySelectorPlugin/index';
import './TimeDisplayPlugin/index';
import './ErrorDisplayPlugin/index';
import './PlaybackRateMenuButtonPlugin/index';
import 'videojs-rotate-player-plugin';
import 'videojs-hotkeys';
import { subscribeVideoMessage } from '../messageHelper';
import { getQualityLevels, isVisibleInViewport, getVideoSources } from './utils';
import type { VideoJsPlayer } from 'video.js';
import type { VideoPlayerProps } from './interface';
import { BASIC_PLAYER_OPTION } from './constants';

import 'video.js/dist/video-js.css';
import './index.less';

function Video({
  id,
  autoplay = false,
  poster,
  sources,
  defaultVolume = 0,
  defaultPlayBackRate = 1.8,
  showBackRate = true,
  showQuality = true,
  showRotate = true,
  showDurationDisplay = true,
  needHotKeys = true,
  needPauseMeSmartly = true,
  options,
  onError,
  onInitialize,
}: VideoPlayerProps) {
  const [hasError, setHasError] = useState(false);

  const updateVolume = (videoPlayer: VideoJsPlayer) => {
    if (videoPlayer?.volume() !== 0) return;

    videoPlayer?.volume(0.5);
  };

  const pauseMeSmartly = (videoPlayer: VideoJsPlayer) => {
    // @ts-ignore
    const visible = isVisibleInViewport(videoPlayer?.el_);
    // @ts-ignore
    const isFullscreen = videoPlayer?.isFullscreen_;

    if (isFullscreen || visible) return;

    videoPlayer?.pause();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const listenTimeupdate = (videoPlayer: VideoJsPlayer) => {
    updateVolume(videoPlayer);

    if (needPauseMeSmartly) pauseMeSmartly(videoPlayer);
  };

  const videoSources: any = getVideoSources(sources);

  useEffect(() => {
    if (!videoSources?.length) return () => {};

    const player = videojs(id, {
      ...BASIC_PLAYER_OPTION,
      autoplay,
      poster,
      sources: videoSources,
      // @ts-ignore
      qualityLevels: showQuality ? getQualityLevels(sources) : [],
      ...options,
    });

    if (showBackRate) {
      // @ts-ignore
      player?.getChild('controlBar').addChild('MyPlaybackRateMenuButton', {}, 6);
      player?.playbackRate(defaultPlayBackRate);
    }
    // @ts-ignore
    if (showDurationDisplay) player?.getChild('controlBar').addChild('MyDurationDisplay', {}, 6);
    // @ts-ignore
    player?.removeChild('errorDisplay');
    // @ts-ignore
    player?.addChild('MyErrorDisplay');

    // @ts-ignore
    if (showQuality) player?.qualitySelector();
    // @ts-ignore
    if (showRotate) player?.rotatePlayerPlugin();
    // @ts-ignore
    if (needHotKeys) player?.hotkeys();

    player?.volume(defaultVolume);

    player?.on('error', handleError);
    player?.on('timeupdate', () => listenTimeupdate(player));

    window.addEventListener('message', subscribeVideoMessage, false);

    onInitialize?.(player);

    return () => {
      window.removeEventListener('message', subscribeVideoMessage, false);

      player?.off('error', handleError);
      player?.off('timeupdate', () => listenTimeupdate(player));
      player?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasSources = Boolean(videoSources?.length);
  const showPadding = hasSources && !hasError;

  const prefixClassName = 'loners-player-video';
  return (
    <div
      className={cx(prefixClassName, {
        [`${prefixClassName}-padding-space`]: showPadding,
      })}
    >
      {hasSources ? (
        <div data-vjs-player>
          <video id={id} className="video-js" />
        </div>
      ) : (
        <Row align="middle" className={`${prefixClassName}-not-play`}>
          <Col span={24}>
            <FrownOutlined className={`${prefixClassName}-frown-icon`} />
            <div className={`${prefixClassName}-not-play-text`}>无法播放，视频资源不存在</div>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default Video;
