import React from 'react';
import BtnLng from '~/lib/components/btns/BtnLng';

import Centered from '~/lib/components/layout/Centered';

const bg = 'https://images.unsplash.com/photo-1583872341575-610c859c7a57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=806&q=80';

const PageCentered = ({
  cover = bg,
  children,
  ...props
}) => {
  const body = (
    <div
      className="d-flex flex-column"
      style={{ minHeight: '100vh' }}
    >
      <div className="p-3 text-end">
        <div className="d-inline-block">
          <BtnLng showLabel />
        </div>
      </div>
      <div className="flex-fill px-5 position-relative">
        <Centered {...props}>
          {children}
        </Centered>
      </div>
    </div>
  );

  return cover ? (
    <div className="d-flex">
      <div className="flex-fill vh-100 sticky-top">
        <div
          className="img-bg"
          style={{ backgroundImage: `url("${cover}")` }}
        />
      </div>
      <div style={{ maxWidth: '100vw', minWidth: '50vw' }}>
        {body}
      </div>
    </div>
  ) : body;
};

export default PageCentered;
