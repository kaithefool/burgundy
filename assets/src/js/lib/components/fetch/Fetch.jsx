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
        {ctx.status === 'success' && (
          typeof children === 'function'
            ? children(ctx.http?.res?.fetched, ctx) : children
        )}
      </>
    )}
  </FetchProvider>
);

export default Fetch;
