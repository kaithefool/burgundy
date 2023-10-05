import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/thumbs';
import 'swiper/scss/pagination';

import useSlider from './useSlider';
import SliderMediaSlide from './SliderMediaSlide';

const SliderSlides = ({
  children,
  slideProps,
  autoplay,
  player = {},
  ...props
}) => {
  const { slides, spaceBetween, pg } = useSlider();
  const [autoplaying, setAutoplaying] = useState(!!autoplay);

  const r = children || ((s, i) => (
    <SliderMediaSlide
      file={s}
      autoplaying={autoplaying}
      player={player}
      isActive={pg.activeIndex === i}
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
