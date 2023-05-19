import React from 'react';
import useSlider from './useSlider';
import SliderSlides from './SliderSlides';

const getPg = (s) => ({
  activeIndex: s.activeIndex,
  isBeginning: s.isBeginning,
  isEnd: s.isEnd,
  length: s.slides.length,
});

const SliderBody = ({
  ...props
}) => {
  const { setSwiper, setPg, thumbsSwiper } = useSlider();

  return (
    <SliderSlides
      spaceBetween={10}
      thumbs={{
        swiper: thumbsSwiper && !thumbsSwiper.destroyed
          ? thumbsSwiper : null,
      }}
      onSwiper={(s) => {
        setPg(getPg(s));
        setSwiper(s);
      }}
      onSlideChange={(s) => setPg(getPg(s))}
      {...props}
    />
  );
};

export default SliderBody;
