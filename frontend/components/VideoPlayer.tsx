'use client';

import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import {
  MediaPlayer,
  MediaProvider,
  isHLSProvider,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
} from '@vidstack/react';
import { Gesture } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import { Poster } from '@vidstack/react';
type Video = {
    vod_id: string;
    vod_name: string;
    vod_pic: string;
    vod_time: string;
    type_name: string;
    vod_play_url: string; 
  };
  
  type VideoPlayerProps = {
    video: Video;
  };
  export default function VideoPlayer({ video }: VideoPlayerProps) {
    function onProviderChange(
      provider: MediaProviderAdapter | null,
      nativeEvent: MediaProviderChangeEvent,
    ) {
      if (isHLSProvider(provider)) {
        // 使用静态导入的方式
        provider.library = '/hls.min.js';
      }
    }
  

  return (
    <MediaPlayer
      title={video.vod_name}
      src={video.vod_play_url}
      onProviderChange={onProviderChange}
      playsInline
      aspectRatio="16/9"
    >
      <MediaProvider>
        <Poster
          className="vds-poster"
          src={video.vod_pic}
          alt={video.vod_name + '视频海报'}
        />
      </MediaProvider>
      <Gesture className="vds-gesture" event="pointerup" action="toggle:controls" />
      <Gesture className="vds-gesture" event="dblpointerup" action="seek:-10" />
      <Gesture className="vds-gesture" event="dblpointerup" action="seek:10" />
      <Gesture className="vds-gesture" event="dblpointerup" action="toggle:fullscreen" />
      <DefaultVideoLayout icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
}