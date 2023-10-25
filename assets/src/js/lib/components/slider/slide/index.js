import SlideContext from './SlideContext';
import SlideProvider from './SlideProvider';
import SlideMedia from './SlideMedia';
import useSlide from './useSlide';

export {
  SlideContext,
  SlideProvider,
  SlideMedia,
  useSlide,
};

const Slide = SlideProvider;

Slide.Media = SlideMedia;

export default Slide;
