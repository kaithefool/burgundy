import React from 'react';

import SlideContext from './SlideContext';
import SlideMedia from './SlideMedia';

const SlideProvider = ({
  children,
  ...props
}) => {
  const value = props;
  const render = children ?? (() => <SlideMedia />);

  return (
    <SlideContext.Provider value={value}>
      {typeof render === 'function' ? render(value, props.index) : render}
    </SlideContext.Provider>
  );
};

export default SlideProvider;
