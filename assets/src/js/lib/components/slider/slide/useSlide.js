import { useContext } from 'react';

import SlideContext from './SlideContext';

function useSlide() {
  return useContext(SlideContext);
}

export default useSlide;
