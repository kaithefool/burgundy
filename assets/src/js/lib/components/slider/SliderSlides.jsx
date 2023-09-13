import React, { useEffect, useState } from 'react';

import {
  Swiper, SwiperSlide, useSwiper,
} from 'swiper/react';
import { Thumbs, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/thumbs';
import 'swiper/scss/pagination';

import Fil, { isPlayable } from '../fils/fil';
import useSlider from './useSlider';

const MediaSlide = ({
  playMediaOnActive = false,
  autoplaying = false,
  file,
  isActive,
}) => {
  const swiper = useSwiper();
  const playable = isPlayable(file.type);

  useEffect(() => {
    if (autoplaying && playMediaOnActive && playable && isActive) {
      swiper.autoplay.stop();
    }
  }, [autoplaying, playMediaOnActive, playable, isActive]);

  return (
    <Fil file={file}>
      <Fil.Preview
        player={{
          ...playMediaOnActive && {
            playing: isActive,
            muted: true,
          },
          ...autoplaying && {
            onEnded: () => {
              // restart autoplay when media finishes
              swiper.slideNext(undefined, undefined, true); // internal
              swiper.autoplay.start();
            },
          },
          loop: !autoplaying,
        }}
      />
    </Fil>
  );
};

const SliderSlides = ({
  children,
  slideProps,
  autoplay,
  playMediaOnActive,
  ...props
}) => {
  const { slides, spaceBetween, pg } = useSlider();
  const [autoplaying, setAutoplaying] = useState(!!autoplay);

  const r = children || ((s, i) => (
    <MediaSlide
      file={s}
      autoplaying={autoplaying}
      playMediaOnActive={playMediaOnActive}
      isActive={pg.activeIndex === i}
      index={i}
    />
  ));

  return (
    <Swiper
      modules={[Thumbs, Pagination, Autoplay]}
      spaceBetween={spaceBetween}
      {...autoplay && {
        autoplay: {
          ...autoplay,
          // this option only works when user touch/swipe the slider
          // we have to handle other slide changes by nav and pagination
          disableOnInteraction: false,
        },
        onBeforeTransitionStart: (s, speed, internal) => {
          if (!internal) {
            // non internal slide changes are user initiated
            s.autoplay.stop();
            setAutoplaying(false);
          }
        },
      }}
      {...props}
    >
      {slides.map((s, i) => (
        <SwiperSlide
          key={s._id || s.key || s.path}
          {...typeof slideProps === 'function' ? slideProps(s, i) : slideProps}
        >
          {(p) => r(s, i, p)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SliderSlides;
