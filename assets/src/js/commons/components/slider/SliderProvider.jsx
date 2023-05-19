import React, { useState } from 'react';

import SliderContext from './SliderContext';

const SliderProvider = ({
  slides,
  spaceBetween = 10,
  children,
}) => {
  const [pg, setPg] = useState({});
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [swiper, setSwiper] = useState(null);

  const value = {
    slides,
    spaceBetween,
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
