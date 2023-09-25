import React from 'react';

import Avatar from './Avatar';
import Name from './Name';

const ListItem = ({
  entry,
  type,
  avatar,
  children,
}) => (
  <div className="d-flex align-items-center">
    <div className="pe-2">
      <Avatar
        entry={entry}
        type={type}
        size={1.6}
        {...avatar}
      />
    </div>
    <div className="flex-fill">
      <div className="text-truncate">
        <Name entry={entry} type={type} />
      </div>
      {children && <div>{children}</div>}
    </div>
  </div>
);

export default ListItem;
