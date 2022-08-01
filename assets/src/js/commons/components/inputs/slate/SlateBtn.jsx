import React from 'react';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';

const SlateBtn = ({
  icon,
  active = false,
  onClick = () => {},
  ...props
}) => (
  <button
    type="button"
    className={`btn${active ? '' : ' text-muted'}`}
    onClick={(evt) => {
      evt.preventDefault();
      onClick(evt);
    }}
    {...props}
  >
    <FA icon={icon} />
  </button>
);

export default SlateBtn;
