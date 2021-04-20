import React, { FC, useLayoutEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { BaseReactPlayerProps } from 'react-player/base';
import { secondsTo60MinFormat } from '../../helpers';
import Controls from './Controls';

type TProps = {
  url: BaseReactPlayerProps['url'];
}

const VideoPlayer: FC<TProps> = ({ url }) => {

  /**
   * Video player state
   */
  const [play, setPlay] = useState(false);

  /**
   * Time state
   */
  const [time, setTime] = useState({
    current: 0,
    end: 0
  });

  /**
   * Volume state
   */
  const [volume, setVolume] = useState(100);

  /**
   * Hide Bottom bar state
   */
  const [isBottomBarHidden, setIsBottomBarHidden] = useState(false);

  /**
   * Play Video
   */
  const playVideo = () => {
    setPlay(true);

    // trigger mousemove event to hide control when mouse is not moving
    wrapperRef.current?.dispatchEvent(new Event('mousemove'));
  };

  /**
   * Pause video
   */
  const pauseVideo = () => {
    setPlay(false);
  };

  /**
   * Toggle Play Video
   */
  const toggleVideo = () => {
    play ? pauseVideo() : playVideo();
  };

  /**
   * Handle progress of current player
   *
   * @param progress
   */
  const handleProgress = (progress: {
    played: number
    playedSeconds: number
    loaded: number
    loadedSeconds: number
  }) => {
    setTime({
      ...time,
      current: progress.playedSeconds
    });
  };

  /**
   * Handle Seek event where the user click the seek slider
   *
   * @param event
   */
  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.currentTarget.value);
    const seconds = time.end * (value / 100);
    setTime({
      ...time,
      current: seconds
    });
    playerRef.current?.seekTo(seconds, 'seconds');
  };

  /**
   * Handle volume event where the user click the volume slider
   *
   * @param event
   */
  const handleVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.currentTarget.value);
    setVolume(value);
  };

  /**
   * Reference to video player and video wrapper
   */
  const playerRef = useRef<ReactPlayer>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /**
   * Start and End of video
   */
  const start = secondsTo60MinFormat(playerRef.current?.getCurrentTime());
  const end = secondsTo60MinFormat(playerRef.current?.getDuration());

  /**
   * Hide Bottom bar
   */
  const hideBottomBar = () => {
    setIsBottomBarHidden(true);
  };

  /**
   * Open Bottom Bar
   */
  const openBottomBar = () => {
    setIsBottomBarHidden(false);
  };

  /**
   * Set end time of player
   */
  const onPlaySetEndTime = () => {
    if (playerRef.current) {
      setTime({
        ...time,
        end: playerRef.current?.getDuration()
      });
    }
  };

  useLayoutEffect(() => {
    let timeout: NodeJS.Timeout;

    wrapperRef.current?.addEventListener('mousemove', () => {
      // console.log('gg');
      clearTimeout(timeout);
      if (isBottomBarHidden) {
        setIsBottomBarHidden(false);
      }

      timeout = setTimeout(() => {
        setIsBottomBarHidden(true);
      }, 3000);
    });
  }, [wrapperRef, isBottomBarHidden, setIsBottomBarHidden, play]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const key = event.code;
    if (key === 'ArrowRight') {
      let newTime = time.current + 3;

      if (time.current > time.end) {
        newTime = time.end;
      }

      setTime({
        ...time,
        current: newTime
      });

      playerRef.current?.seekTo(newTime, 'seconds');
    } else if (key === 'ArrowLeft') {
      let newTime = time.current - 3;

      if (time.current < 0) {
        newTime = 0;
      }

      setTime({
        ...time,
        current: newTime
      });

      playerRef.current?.seekTo(newTime, 'seconds');
    } else if (key === 'ArrowUp') {
      if (volume < 100) {
        setVolume(volume + 10);
      }
    } else if (key === 'ArrowDown') {
      if (volume > 0) {
        setVolume(volume - 10);
      }
    } else if (key === 'Space') {
      toggleVideo();
    }
  };

  return (
    <div
      id="video-player"
      onMouseLeave={hideBottomBar}
      onMouseEnter={openBottomBar}
      onKeyDown={onKeyDown}
      tabIndex={0}
      onClick={toggleVideo}
      ref={wrapperRef}
    >
      <ReactPlayer
        className="player"
        url={url}
        playing={play}
        onProgress={handleProgress}
        onPlay={onPlaySetEndTime}
        onEnded={pauseVideo}
        onPause={pauseVideo}
        volume={volume / 100}
        ref={playerRef}
      />
      <Controls
        start={start}
        end={end}
        play={play}
        progress={(100 * (time.current / time.end)) || 0}
        volume={volume}
        hide={play && isBottomBarHidden}
        toggleVideo={toggleVideo}
        onSeek={handleSeek}
        onVolume={handleVolume}
      />
    </div>
  );
};

export default VideoPlayer;
