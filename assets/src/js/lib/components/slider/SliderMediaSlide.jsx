import React, { useEffect } from 'react';
import { useSwiper } from 'swiper/react';
import Fil, { isPlayable } from '../fils/fil';

const SliderMediaSlide = ({
  autoplaying = false,
  player: {
    autoStart = false,
    ...player
  },
  file,
  isActive,
}) => {
  const swiper = useSwiper();
  const playable = isPlayable(file.type);

  useEffect(() => {
    if (autoplaying && autoStart && playable && isActive) {
      swiper.autoplay.stop();
    }
  }, [autoplaying, autoStart, playable, isActive]);

  return (
    <Fil file={file}>
      <Fil.Preview
        player={{
          ...autoStart && {
            playing: isActive,
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

export default SliderMediaSlide;
