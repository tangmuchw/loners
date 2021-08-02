import React, { useState } from 'react';
import { Button, Row, Col } from 'antd';
import { getAudioSources } from './utils';
import { DEFAULT_PLAYBACK_RATES } from './constants';
import type { AudioPlayerProps } from './interface';
import './index.less';

function AudioPlayer({ className, id, sources, preload = 'none', source }: AudioPlayerProps) {
  const rates = DEFAULT_PLAYBACK_RATES;
  const [playRate, setPlayRate] = useState(rates[0]);

  const changePlayRate = (rate: string) => {
    const audioDom = document.querySelector(`audio[id='${id}']`);
    setPlayRate(rate);

    if (!audioDom) return;
    // @ts-ignore
    audioDom.playbackRate = parseFloat(rate);
    // @ts-ignore
    audioDom?.play();
  };

  const resource = getAudioSources(sources);

  return (
    <Row className={className} align="middle">
      <Col className="loners-player-audio-col">
        <audio id={id} autoPlay={false} preload={preload} controls controlsList="nodownload">
          <track kind="captions" />
          {resource?.length &&
            resource.map(({ src, type }: any) => <source src={src} type={type} />)}
          {source && (
            <source src={`${source.play_url}.${source.format}`} type={`audio/${source.format}`} />
          )}
        </audio>
      </Col>
      <Col className="mg-l">
        <Row>
          {rates.map((rate: string) => (
            <Col className="mg-r">
              <Button
                key={rate}
                size="small"
                type={playRate === rate ? 'primary' : 'default'}
                onClick={() => changePlayRate(rate)}
              >
                X {rate}
              </Button>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
}

export default AudioPlayer;
