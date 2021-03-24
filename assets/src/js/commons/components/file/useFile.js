import { useContext } from 'react';

import FileContext from './FileContext';

function useFile() {
  return useContext(FileContext);
}

export default useFile;
