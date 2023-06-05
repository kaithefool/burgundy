/* eslint-disable react/no-danger */
import React from 'react';

import { sanitizeHtml } from '../../helpers';

const Html = ({
  children,
}) => (
  <div
    className="ht"
    dangerouslySetInnerHTML={{ __html: sanitizeHtml(children) }}
  />
);

export default Html;
