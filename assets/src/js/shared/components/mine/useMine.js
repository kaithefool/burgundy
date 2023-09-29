import { useContext } from 'react';

import MineContext from './MineContext';

function useMine() {
  return useContext(MineContext);
}

export default useMine;
