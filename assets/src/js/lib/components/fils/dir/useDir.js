import { useContext } from 'react';

import DirContext from './DirContext';

function useDir() {
  return useContext(DirContext);
}

export default useDir;
