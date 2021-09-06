import React from 'react';

import Fetchable from '~/commons/components/util/Fetchable';

const Doc = ({
  _id,
  api,
  children,
}) => {
  if (_id === 'new') {
    return children();
  }

  return (
    <Fetchable
      req={{
        ...api,
        url: `${api.url}/${_id}`,
      }}
    >
      {(doc) => children(doc)}
    </Fetchable>
  );
};

export default Doc;
