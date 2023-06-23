import SliderProvider from './SliderProvider';
import SliderContext from './SliderContext';
import useSlider from './useSlider';
import SliderBody from './SliderBody';
import SliderNav from './SliderNav';
import SliderSlides from './SliderSlides';
import SliderThumbs from './SliderThumbs';
import SliderPg from './SliderPg';
import SliderLightbox from './SliderLightbox';

export {
  SliderContext,
  useSlider,
  SliderBody,
  SliderNav,
  SliderSlides,
  SliderThumbs,
  SliderPg,
  SliderLightbox,
};

const Slider = SliderProvider;

Slider.Body = SliderBody;
Slider.Nav = SliderNav;
Slider.Slides = SliderSlides;
Slider.Thumbs = SliderThumbs;
Slider.Pg = SliderPg;
Slider.Lightbox = SliderLightbox;

export default Slider;
