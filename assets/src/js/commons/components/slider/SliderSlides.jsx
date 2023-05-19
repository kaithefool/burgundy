import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Pagination } from 'swiper';

import 'swiper/scss';
import 'swiper/scss/thumbs';
import 'swiper/scss/pagination';

import useSlider from './useSlider';

const SliderSlides = ({
  children,
  slideProps,
  ...props
}) => {
  const { slides, spaceBetween } = useSlider();

  const r = children || ((s) => (
    <div
      className="img-bg"
      style={{ backgroundImage: `url(${s.path})` }}
    />
  ));

  return (
    <Swiper
      modules={[Thumbs, Pagination]}
      spaceBetween={spaceBetween}
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
