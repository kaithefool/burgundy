import React from 'react';

const SlateElement = ({
  attributes,
  children,
  element,
}) => {
  const style = { textAlign: element.align };

  return React.createElement(
    element.type,
    { style, ...attributes },
    children,
  );
};

export default SlateElement;
