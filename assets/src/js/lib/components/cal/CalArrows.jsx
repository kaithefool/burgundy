import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons/faChevronRight';
import useCal from './useCal';

const CalArrows = () => {
  const { query: { view, date }, fetch } = useCal();

  return (
    <>
      <button
        type="button"
        className="btn"
        onClick={() => {
          fetch({ date: date.minus({ [view]: 1 }).startOf(view) });
        }}
      >
        <FA icon={faChevronLeft} />
      </button>
      <button
        type="button"
        className="btn"
        onClick={() => {
          fetch({ date: date.plus({ [view]: 1 }).startOf(view) });
        }}
      >
        <FA icon={faChevronRight} />
      </button>
    </>
  );
};

export default CalArrows;
