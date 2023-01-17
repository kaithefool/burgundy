import React, { Fragment } from 'react';
import groupBy from 'lodash/groupBy';
import useList from './useList';

const ListGroups = ({
  rows: optRows,
  label = true,
  group = (c) => c,
  by,
  children,
}) => {
  const { rows: listRows } = useList();

  const grouped = groupBy(optRows || listRows || [], by);
  const l = label && (
    typeof label === 'boolean'
      ? (key) => <h6>{key}</h6>
      : label
  );

  return (
    <>
      {Object.keys(grouped).map((g) => (
        <Fragment key={g}>
          {group(
            <>
              {l && l(g)}
              {grouped[g].map((r) => children(r))}
            </>,
            g,
          )}
        </Fragment>
      ))}
    </>
  );
};

export default ListGroups;
