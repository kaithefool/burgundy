import React from 'react';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const SlateColorPicker = ({
  icon,
  colors = [
    '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC',
    '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF',
  ],
}) => {
  const popover = (
    <Popover>
      <Popover.Body>
        <div className="">
          {colors.map((c) => (
            <div
              key={c}
              className="ratio ratio-1x1 rounded cursor-pointer my-1 mx-2 d-inline-block"
              style={{
                backgroundColor: c,
                width: '1.5rem',
              }}
            />
          ))}
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger="click"
      overlay={popover}
    >
      <button
        type="button"
        className="btn"
      >
        <FA icon={icon} />
      </button>
    </OverlayTrigger>
  );
};

export default SlateColorPicker;
