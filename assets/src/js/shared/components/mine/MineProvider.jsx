import React from 'react';

import useHttp from '~/lib/hooks/useHttp';
import env from '~/lib/config/env';
import MineContext from './MineContext';

const MineProvider = ({
  api = { url: '/api/users/self' },
  children,
}) => {
  const { req, fetched } = useHttp(env.user && api);

  const value = {
    mine: fetched ?? env.user,
    refresh: () => req(api),
  };

  return (
    <MineContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </MineContext.Provider>
  );
};

export default MineProvider;
