import React from 'react';

import env from '~/lib/config/env';

const { title = '' } = env?.meta ?? {};

const Logo = ({
  short = false,
  className = 'fs-5',
  ...props
}) => (
  <div className={className} {...props}>
    <span
      className="text-primary font-monospace"
      style={{ letterSpacing: '.12rem' }}
    >
      {short ? title[0] : title}
    </span>
  </div>
);

export default Logo;
