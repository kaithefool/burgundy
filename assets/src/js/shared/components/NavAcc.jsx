import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import Avatar from './Avatar';
import ListItem from './ListItem';
import { useMine } from './mine';

const NavAcc = ({
  toggleClassName = 'btn',
}) => {
  const { mine } = useMine();
  const [show, setShow] = useState(false);

  return (
    <>
      <button type="button" className={toggleClassName}>
        <Avatar type="user" entry={mine} size={2.5} />
      </button>
      <Dropdown show={show} onToggle={(s) => setShow(s)}>
        <Dropdown.Menu />
      </Dropdown>
    </>
  );
};

export default NavAcc;
