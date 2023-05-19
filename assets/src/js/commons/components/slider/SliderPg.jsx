import React from 'react';

import useSlider from './useSlider';

const SliderPg = () => {
  const { pg } = useSlider();

  return (
    <>
      {pg.activeIndex + 1}
      <span className="mx-2">/</span>
      {pg.length}
    </>
  );
};

export default SliderPg;
