import React from 'react';

import useFil from './useFil';
import FilLink from './FilLink';

const FilName = ({
  className = 'link-dark',
  link,
}) => {
  const { file: { name = '', path, type } } = useFil();
  let n = name || path;
  let ext = '';

  if (!type.match(/^cloud\//)) {
    ([, n, ext] = n.match(/(.*?)(\.[^.]*)$/));
  }

  const content = (
    <div className="w-100 d-inline-flex flex-nowrap">
      <div
        className="text-truncate"
        style={{ flex: '0 1 content' }}
      >
        {n}
      </div>
      <div
        style={{
          flex: '1 0 content',
          whiteSpace: 'nowrap',
        }}
      >
        {ext}
      </div>
    </div>
  );

  return link ? (
    <FilLink className={className}>
      {content}
    </FilLink>
  ) : content;
};

export default FilName;
