import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';

import useSlider from './useSlider';

const SliderNav = ({
  className = (dir) => `
    position-absolute top-50 translate-middle-y
    btn btn-lg text-white bg-dark bg-opacity-50 rounded-0
    ${dir === 'prev' ? 'start-0' : 'end-0'}
  `,
}) => {
  const { pg, swiper, length } = useSlider();

  if (!length) return '';

  return (
    <div>
      <button
        type="button"
        className={className('prev')}
        disabled={pg.isBeginning}
        style={{ zIndex: 10 }}
        onClick={() => swiper.slidePrev()}
      >
        <FA icon={faArrowLeft} />
      </button>
      <button
        type="button"
        className={className('next')}
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
