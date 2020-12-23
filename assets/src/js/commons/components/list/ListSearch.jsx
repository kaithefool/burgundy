import React, { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

const ListSearch = ({
  opts,
  onSearch = () => {},
  debounce: deboucT = 1500,
  placeholder = '',
}) => {
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState(
    Array.isArray(opts)
      ? opts[0].value || opts[0]
      : null,
  );
  const debouncedSearch = useCallback(debounce(
    (str, by) => {
      const f = { search: str };

      if (!str) return onSearch({});
      if (by) f.searchBy = by;

      return onSearch(f);
    },
    deboucT,
    { leading: true },
  ), []);
  const current = Array.isArray(opts)
    ? opts.find((s) => (s.value || s) === searchBy)
    : opts;

  return (
    <div className="input-group">
      {/* Select search by */}
      {Array.isArray(opts) && (
        <div className="input-group-prepend">
          <select
            name="searchBy"
            className="custom-select"
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
                {by.label || by.value}
              </option>
            ))}
          </select>
        </div>
      )}
      {/* Search input */}
      {current.options ? (
        <select
          className="custom-select"
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
