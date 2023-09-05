import React from 'react';
import useSlider from './useSlider';
import SliderSlides from './SliderSlides';

const SliderBody = (props) => {
  const {
    initialSlide, setSwiper, pg, setPg, thumbsSwiper,
  } = useSlider();

  return (
    <SliderSlides
      initialSlide={initialSlide}
      thumbs={{
        swiper: thumbsSwiper && !thumbsSwiper.destroyed
          ? thumbsSwiper : null,
      }}
      onSwiper={setSwiper}
      onSlideChange={(s) => setPg({
        ...pg,
        activeIndex: s.activeIndex,
        isBeginning: s.isBeginning,
        isEnd: s.isEnd,
      })}
      video={{ playOnActiveSlide: true }}
      {...props}
    />
  );
};

export default SliderBody;
