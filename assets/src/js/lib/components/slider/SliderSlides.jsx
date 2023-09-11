import React, { useEffect, useState } from 'react';

import {
  Swiper, SwiperSlide, useSwiper, useSwiperSlide,
} from 'swiper/react';
import { Thumbs, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/thumbs';
import 'swiper/scss/pagination';

import Fil, { isPreviewable } from '../fils/fil';
import useSlider from './useSlider';

const MediaSlide = ({
  playOnActiveSlide = false,
  autoplay = false,
  file,
}) => {
  const swiper = useSwiper();
  const { isActive } = useSwiperSlide();
  const isVideo = isPreviewable(file.type)?.match(/^video\//);

  useEffect(() => {
    if (autoplay && isVideo && isActive) {
      swiper.autoplay.stop();
    }
  }, [!!autoplay, isVideo, isActive]);

  return (
    <Fil file={file}>
      <Fil.Preview
        {...playOnActiveSlide && {
          video: {
            playing: isActive,
            style: { pointerEvents: 'none' },
            onEnded: () => {
              if (autoplay) {
                // restart autoplay
                swiper.slideNext(undefined, undefined, true); // internal
                swiper.autoplay.start();
              }
            },
            // controls: true,
            muted: true,
            loop: !autoplay,
          },
        }}
      />
    </Fil>
  );
};

const SliderSlides = ({
  children,
  slideProps,
  video,
  autoplay,
  ...props
}) => {
  const { slides, spaceBetween } = useSlider();
  const [autoplaying, setAutoplaying] = useState(!!autoplay);

  const r = children || ((s) => (
    <MediaSlide file={s} {...video} autoplay={autoplaying} />
  ));

  return (
    <Swiper
      modules={[Thumbs, Pagination, Autoplay]}
      spaceBetween={spaceBetween}
      {...autoplay && {
        autoplay: {
          ...autoplay,
          // this option only works when user touch/swipe the slider
          // we have to handle other slide changes from nav and pagination
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
