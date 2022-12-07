import React from 'react';

const MultiLines = ({ children = '' }) => (
  <>
    {
      children
        .split(/(\n)/)
        .filter((s) => s !== '')
        .map((s, i) => {
          if (s === '\n') return <br key={i} />;

          return s;
        })
    }
  </>
);

export default MultiLines;
