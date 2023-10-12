import React from 'react';

import env from '~/lib/config/env';

const { title = '' } = env?.meta ?? {};

const Logo = ({ short = false }) => (
  <h5
    className="mx-4 my-3 text-primary"
    style={{ letterSpacing: '.24rem' }}
  >
    {short ? title[0] : title}
  </h5>
);

export default Logo;
