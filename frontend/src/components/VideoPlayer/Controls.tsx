import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from 'reactstrap';

type TProps = {
  play: boolean;
  start: string;
  end: string;
  progress: number;
  volume: number;
  hide: boolean;
  toggleVideo: () => void;
  onSeek: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onVolume: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Controls: FC<TProps> = (props) => {
  const { play, progress, start, end, volume, hide, toggleVideo, onSeek, onVolume } = props;

  return (
    <div
      className={'control' + (hide ? ' hide' : '')}
    >
      {/* Video details */}
      <div className="group flex-grow-1 w-auto">
        {/* Play Button */}
        <FontAwesomeIcon
          icon={!play ? 'play' : 'pause'}
          color="white"
          className="item video-button"
          onClick={toggleVideo}
          fixedWidth
        />
        {/* Duration Slider */}
        <span className="item flex-grow-1 w-auto">
          <Input type="range" className="align-self-center" value={progress} onChange={onSeek}/>
        </span>
        {/* Duration */}
        <span className="item">{start} - {end}</span>
      </div>

      {/* Audio Settings */}
      <div className="group">
        {/* Volume Icon */}
        <FontAwesomeIcon
          icon="volume-up"
          color="white"
          className="item video-button"
          fixedWidth
        />
        {/* Volume */}
        <span className="item flex-grow-1">
          <Input type="range" className="align-self-center" value={volume} onChange={onVolume}/>
        </span>
      </div>

      {/*<div className="group">*/}
      {/*  /!* Fullscreen *!/*/}
      {/*  <FontAwesomeIcon*/}
      {/*    icon="expand"*/}
      {/*    color="white"*/}
      {/*    className="item video-button"*/}
      {/*    fixedWidth*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  );
};

export default Controls;
