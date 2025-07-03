import React, { useState } from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

import useList from './useList';
import useDebounce from '../../hooks/useDebounce';

const ListSearch = ({
  opts,
  debounce: deboucT = 750,
  placeholder = '',
  className = '',
  onChange = () => {},
  children,
  ...props
}) => {
  const { fetch, query } = useList();
  const [searchStr, setSearchStr] = useState(query.filter?.search || '');
  const [searchBy, setSearchBy] = useState(
    Array.isArray(opts)
      ? opts[0].value || opts[0]
      : null,
  );
  const search = (str, by) => {
    const { search: s, ...f } = query.filter;

    if (by) f.search = { [by]: str };
    else if (str) f.search = str;

    fetch({ filter: f });
    onChange(f);
  };
  const debouncedSearch = useDebounce(search, deboucT);

  return (
    <div className={`input-group input-group-input-rows ${className}`}>
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

            setSearchStr('');
            setSearchBy(value);
            search('', value);
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
      <input
        type="search"
        enterKeyHint="search"
        className="form-control"
        placeholder={placeholder}
        value={searchStr}
        onKeyDown={({
          key, shiftKey, metaKey, ctrlKey, target,
        }) => {
          if (!shiftKey && !metaKey && !ctrlKey && key === 'Enter') {
            target?.blur();
          }
        }}
        onChange={(e) => {
          const { value } = e.target;

          setSearchStr(value);
          debouncedSearch(value, searchBy);
        }}
        {...props}
      />
      {/* Clear search input */}
      {searchStr && (
        <button
          aria-label="Clear Search"
          type="button"
          className="btn"
          onClick={() => {
            setSearchStr('');
            search('', searchBy);
          }}
        >
          <FA icon={faTimes} />
        </button>
      )}
      {children && (
        <div className="w-100">
          {children}
        </div>
      )}
    </div>
  );
};

export default ListSearch;
