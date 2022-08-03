import React from 'react';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';

const SlateBtn = ({
  icon,
  active = false,
  onMouseDown = () => {},
  className = '',
  ...props
}) => (
  <button
    type="button"
    className={`
      btn
      ${className}
      ${active ? '' : ' text-muted'}
    `}
    onMouseDown={(evt) => {
      evt.preventDefault();
      onMouseDown(evt);
    }}
    {...props}
  >
    <FA icon={icon} />
  </button>
);

export default SlateBtn;
