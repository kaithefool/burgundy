import React, { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';

import useList from './useList';

const ListSearch = ({
  opts,
  debounce: deboucT = 1500,
  placeholder = '',
}) => {
  const { fetch, filter } = useList();
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState(
    Array.isArray(opts)
      ? opts[0].value || opts[0]
      : null,
  );
  const debouncedSearch = useCallback(debounce(
    (str, by) => {
      const { search: s, ...f } = filter;

      if (by) f.search = { [by]: str };
      else if (str) f.search = str;

      fetch(f);
    },
    deboucT,
  ), []);
  const current = Array.isArray(opts)
    ? opts.find((s) => (s.value || s) === searchBy)
    : opts;

  return (
    <div className="input-group">
      <span className="input-group-text">
        <FA icon={faSearch} />
      </span>
      {/* Select search by */}
      {Array.isArray(opts) && (
        <select
          name="searchBy"
          className="form-select flex-auto"
          value={searchBy}
          onChange={(e) => {
            const { value } = e.target;

            setSearch('');
            debouncedSearch('', value);
            setSearchBy(value);
          }}
        >
          {opts.map((by) => (
            <option
              key={by.value || by}
              value={by.value || by}
            >
              {by.label || by.value || by}
            </option>
          ))}
        </select>
      )}
      {/* Search input */}
      {current.options ? (
        <select
          className="form-select"
          value={search}
          onChange={(e) => {
            const { value } = e.target;

            setSearch(value);
            debouncedSearch(value, searchBy);
          }}
        >
          <option value="">Show All</option>
          {current.options.map((o) => (
            <option
              key={o.value}
              value={o.value}
            >{o.label || o.value}</option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          value={search}
          onChange={(e) => {
            const { value } = e.target;

            setSearch(value);
            debouncedSearch(value, searchBy);
          }}
        />
      )}
    </div>
  );
};

export default ListSearch;
