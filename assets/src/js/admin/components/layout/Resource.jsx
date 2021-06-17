import React from 'react';

import Fetchable from '~/commons/components/util/Fetchable';

const Resource = ({
  id,
  api,
  children,
}) => {
  if (id === 'new') {
    return children();
  }

  return (
    <Fetchable req={{
      ...api,
      url: `${api.url}/${id}`,
    }}>
      {(doc) => children(doc)}
    </Fetchable>
  );
};

export default Resource;
