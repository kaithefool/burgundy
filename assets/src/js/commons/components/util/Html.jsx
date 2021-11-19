/* eslint-disable react/no-danger */
import React from 'react';

import { sanitizeHtml } from '../../helpers';

const Html = ({
  children,
}) => (
  <div
    className="note"
    dangerouslySetInnerHTML={{ __html: sanitizeHtml(children) }}
  />
);

export default Html;
