import React from 'react';

import useSlider from './useSlider';

const SliderPg = () => {
  const { pg, length } = useSlider();

  return (
    <>
      {pg.activeIndex + 1}
      <span className="mx-2">/</span>
      {length}
    </>
  );
};

export default SliderPg;
