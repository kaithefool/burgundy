import React from 'react';

import FilsListItemList from './FilsListItemList';
import FilsListItemGrid from './FilsListItemGrid';

const FilsListItem = ({
  file,
  mode = 'list',
  className = '',
  dragHandle,
  removeable = true,
}) => {
  const p = { file, dragHandle, removeable };

  return (
    <div className={className}>
      {
        mode === 'list'
          ? <FilsListItemList {...p} />
          : <FilsListItemGrid {...p} />
      }
    </div>
  );
};

export default FilsListItem;
