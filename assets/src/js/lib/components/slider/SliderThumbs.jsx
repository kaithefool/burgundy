import React from 'react';

import useSlider from './useSlider';
import SliderSlides from './SliderSlides';

const SliderThumbs = ({
  children,
  ...props
}) => {
  const { setThumbsSwiper, spaceBetween } = useSlider();

  return (
    <SliderSlides
      className="swiper-thumbs"
      style={{ marginTop: spaceBetween }}
      onSwiper={(s) => {
        // wait for modal to show
        setTimeout(() => setThumbsSwiper(s), 0);
      }}
      slidesPerView="auto"
      watchSlidesProgress
      centerInsufficientSlides
      {...props}
    />
  );
};

export default SliderThumbs;
