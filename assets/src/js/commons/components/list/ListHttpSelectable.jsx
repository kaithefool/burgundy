import React, { useState } from 'react';

import ListHttp from './ListHttp.jsx';

const ListHttpSelectable = ({
  onSelect,
  children,
  ...props
}) => {
  const [selected, setSelected] = useState([]);

  return (
    <ListHttp
      onFetch={() => {
        // clear select
        if (onSelect) {
          setSelected([]);
          onSelect([]);
        }
      }}
      {...props}
    >
      {(p) => {
        const { fetched } = p;

        return children({
          ...p,
          selected: onSelect ? selected : null,
          onSelect: onSelect ? (s) => {
            setSelected(s);
            onSelect(s.map((i) => (
              fetched.payload.rows[i]
            )));
          } : undefined,
        });
      }}
    </ListHttp>
  );
};

export default ListHttpSelectable;
