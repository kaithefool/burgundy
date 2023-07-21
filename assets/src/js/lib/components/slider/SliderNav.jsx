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
  style = () => ({ zIndex: 10 }),
}) => {
  const { pg, swiper, length = 0 } = useSlider();

  if (length <= 1) return '';

  return (
    <div>
      <button
        type="button"
        className={className('prev')}
        style={style('prev')}
        disabled={pg.isBeginning}
        onClick={() => swiper.slidePrev()}
      >
        <FA icon={faArrowLeft} />
      </button>
      <button
        type="button"
        className={className('next')}
        style={style('next')}
        disabled={pg.isEnd}
        onClick={() => swiper.slideNext()}
      >
        <FA icon={faArrowRight} />
      </button>
    </div>
  );
};

export default SliderNav;
