import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/thumbs';
import 'swiper/scss/pagination';

import useSlider from './useSlider';
import Slide from './slide';

const SliderSlides = ({
  children,
  slideProps,
  autoplay: autoplayProp,
  player = {},
  filClassName,
  ...props
}) => {
  const { slides, spaceBetween, pg } = useSlider();
  // disable autoplay when there is only one slide
  const autoplay = slides.length > 1 && autoplayProp;
  const [autoplaying, setAutoplaying] = useState(!!autoplay);

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
          {/* {(p) => r(s, i, p)} */}
          <Slide
            slide={s}
            index={i}
            autoplaying={autoplaying}
            player={player}
            filClassName={filClassName}
            isCurrent={pg.activeIndex === i}
          >
            {children}
          </Slide>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SliderSlides;
