import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';

import useSlider from './useSlider';

const posClassName = 'position-absolute top-50 translate-middle-y';

const SliderNav = ({
  className = 'btn btn-lg text-white bg-dark bg-opacity-50 rounded-0',
}) => {
  const { pg, swiper, length } = useSlider();

  if (!length) return '';

  return (
    <div>
      <button
        type="button"
        className={`${posClassName} start-0 ${className}`}
        disabled={pg.isBeginning}
        style={{ zIndex: 10 }}
        onClick={() => swiper.slidePrev()}
      >
        <FA icon={faArrowLeft} />
      </button>
      <button
        type="button"
        className={`${posClassName} end-0 ${className}`}
        disabled={pg.isEnd}
        style={{ zIndex: 10 }}
        onClick={() => swiper.slideNext()}
      >
        <FA icon={faArrowRight} />
      </button>
    </div>
  );
};

export default SliderNav;
