import React from 'react';

import SlideContext from './SlideContext';
import SlideMedia from './SlideMedia';

const SlideProvider = ({
  children,
  ...props
}) => {
  const value = props;
  const { slide, index } = value;
  const render = children ?? (() => <SlideMedia />);

  return (
    <SlideContext.Provider value={value}>
      {typeof render === 'function' ? render(slide, index, value) : render}
    </SlideContext.Provider>
  );
};

export default SlideProvider;
