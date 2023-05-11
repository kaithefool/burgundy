import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/thumbs';
import 'swiper/scss/pagination';
import { Thumbs, Pagination } from 'swiper';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import {
  faArrowAltCircleDown,
} from '@fortawesome/free-solid-svg-icons/faArrowAltCircleDown';

import Fil from './fil';

const navClassName = `
  position-absolute top-50 translate-middle-y
  btn btn-lg text-white bg-dark bg-opacity-50
  rounded-0
`;

const FilsSlideShow = ({
  className = '',
  files,
  initSlide: init = 0,
  controls,
  thumbs = true,
  nav = true,
  header = true,
  cover = false,
  onSlideClick = () => {},
  ...props
}) => {
  const swiper = useRef();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const imgs = files.filter((f) => f.type.split('/')[0] === 'image');
  const initSlide = typeof init === 'number'
    ? init
    : imgs.findIndex(
      (f) => f.path === init.path || (f.key && f.key === init.key),
    );
  const [pg, setPg] = useState({
    activeIndex: initSlide,
    length: imgs.length,
  });

  return (
    <div className={`d-flex flex-column ${className}`}>
      {header && (
        <div className="row g-0 align-items-center">
          <div className="col text-white">
            <div className="px-2">
              {pg.activeIndex + 1}
              <span className="mx-2">/</span>
              {pg.length}
            </div>
          </div>
          <div className="col-auto">
            <a
              className="btn btn-link text-white"
              href={`/uploads/${imgs[pg.activeIndex].path}`}
              target="_blank"
              rel="noreferrer"
            >
              <FA icon={faArrowAltCircleDown} size="lg" />
            </a>
          </div>
          {controls && (
            <div className="col-auto">
              {controls}
            </div>
          )}
        </div>
      )}
      <div className="flex-fill position-relative">
        <Swiper
          className="h-100"
          spaceBetween={10}
          thumbs={{
            swiper: thumbsSwiper && !thumbsSwiper.destroyed
              ? thumbsSwiper : null,
            slideThumbActiveClass: 'opacity-100',
          }}
          modules={[Thumbs, Pagination]}
          initialSlide={initSlide}
          onSwiper={(s) => { swiper.current = s; }}
          onSlideChange={(s) => setPg({
            activeIndex: s.activeIndex,
            isBeginning: s.isBeginning,
            isEnd: s.isEnd,
            length: s.slides.length,
          })}
          {...props}
        >
          {imgs.map((img) => (
            <SwiperSlide key={img.key || img.path}>
              <Fil file={img}>
                <div onClick={() => onSlideClick(img)}>
                  <Fil.Preview
                    className={`img-bg-${cover ? 'cover' : 'contain'}`}
                  />
                </div>
              </Fil>
            </SwiperSlide>
          ))}
        </Swiper>
        {nav && imgs.length > 1 && (
          <div>
            <button
              type="button"
              className={`${navClassName} start-0`}
              disabled={pg.isBeginning}
              style={{ zIndex: 10 }}
              onClick={() => swiper?.current?.slidePrev()}
            >
              <FA icon={faArrowLeft} />
            </button>
            <button
              type="button"
              className={`${navClassName} end-0`}
              disabled={pg.isEnd}
              style={{ zIndex: 10 }}
              onClick={() => swiper?.current?.slideNext()}
            >
              <FA icon={faArrowRight} />
            </button>
          </div>
        )}
      </div>
      {thumbs && imgs.length > 1 && (
        <div style={{ paddingTop: '10px' }}>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView="auto"
            watchSlidesProgress
            centerInsufficientSlides
            modules={[Thumbs]}
          >
            {imgs.map((img) => (
              <SwiperSlide
                key={img.key || img.path}
                style={{ width: '80px', height: '80px' }}
                className="opacity-50"
              >
                <Fil file={img}>
                  <div className="cursor-pointer">
                    <Fil.Preview />
                  </div>
                </Fil>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default FilsSlideShow;
