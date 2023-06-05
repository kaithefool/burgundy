import React from 'react';

export default React.createContext({
  slides: [],
  initialSlide: 0,
  spaceBetween: 10,
  pg: {
    activeIndex: 0,
    isBeginning: true,
    isEnd: false,
    length: 0,
  },
  setPg: () => {},
  swiper: null,
  setSwiper: () => {},
  thumbsSwiper: null,
  setThumbsSwiper: () => {},
});
