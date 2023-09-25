import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import env from '~/lib/config/env';
import Avatar from './Avatar';
import ListItem from './ListItem';

const NavAcc = ({
  toggleClassName = 'btn',
}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button type="button" className={toggleClassName}>
        <Avatar type={env.user} size={2.5} />
      </button>
      <Dropdown show={show} onToggle={(s) => setShow(s)}>
        <Dropdown.Menu />
      </Dropdown>
    </>
  );
};

export default NavAcc;
