import React from 'react';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import Dropdown from 'react-bootstrap/Dropdown';

const SlateSelect = ({
  children,
  isActive = () => false,
  onClick = () => {},
}) => {
  const active = children.find((c) => isActive(c.format)) ?? children[0];

  return (
    <Dropdown className="d-inline-block">
      <Dropdown.Toggle variant="">
        <FA icon={active.icon} />
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ minWidth: 'auto' }}>
        {children.map((c, i) => (
          <Dropdown.Item
            className={c.format !== active.format ? 'text-muted' : ''}
            key={i}
            onClick={(evt) => {
              evt.preventDefault();
              onClick(c.format);
            }}
          >
            <FA icon={c.icon} />
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SlateSelect;
