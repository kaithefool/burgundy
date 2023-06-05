import { useContext } from 'react';

import SliderContext from './SliderContext';

function useSlider() {
  return useContext(SliderContext);
}

export default useSlider;
