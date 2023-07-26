import React from 'react';
import FetchProvider from './FetchProvider';
import FetchError from './FetchError';
import FetchPending from './FetchPending';

const Fetch = ({ children, ...props }) => (
  <FetchProvider {...props}>
    {(ctx) => (
      <>
        <FetchPending />
        <FetchError />
        {ctx.http?.fetched && (
          typeof children === 'function'
            ? children(ctx.http.fetched?.payload, ctx) : children
        )}
      </>
    )}
  </FetchProvider>
);

export default Fetch;
