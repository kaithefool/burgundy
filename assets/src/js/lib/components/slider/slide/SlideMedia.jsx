import React, { useEffect } from 'react';
import { useSwiper } from 'swiper/react';
import Fil, { isPlayable } from '../../fils/fil';
import useSlide from './useSlide';

const SlideMedia = ({ file: fileProp }) => {
  const swiper = useSwiper();
  const {
    slide,
    autoplaying,
    player: {
      autoStart = false,
      ...player
    } = {},
    isCurrent,
  } = useSlide();
  const file = fileProp ?? slide;
  const playable = isPlayable(file.type);

  useEffect(() => {
    if (autoplaying && autoStart && playable && isCurrent) {
      swiper.autoplay.stop();
    }
  }, [autoplaying, autoStart, playable, isCurrent]);

  return (
    <Fil file={file}>
      <Fil.Preview
        player={{
          ...autoStart && {
            playing: isCurrent,
            muted: true,
          },
          ...autoplaying && autoStart && {
            onEnded: () => {
              // restart autoplay when media finishes
              swiper.slideNext(undefined, undefined, true); // internal
              swiper.autoplay.start();
            },
          },
          loop: !autoplaying,
          ...player,
        }}
      />
    </Fil>
  );
};

export default SlideMedia;
