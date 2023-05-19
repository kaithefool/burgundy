import React, { useState } from 'react';

import SliderContext from './SliderContext';

const SliderProvider = ({
  slides,
  spaceBetween = 10,
  initialSlide = 0,
  children,
}) => {
  const [pg, setPg] = useState({
    activeIndex: initialSlide,
    isBeginning: initialSlide === 0,
    isEnd: initialSlide === slides.length - 1,
    length: slides.length,
  });
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [swiper, setSwiper] = useState(null);

  const value = {
    slides,
    spaceBetween,
    initialSlide,
    pg,
    setPg,
    swiper,
    setSwiper,
    thumbsSwiper,
    setThumbsSwiper,
  };

  return (
    <SliderContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </SliderContext.Provider>
  );
};

export default SliderProvider;
