import { useContext } from 'react';

import FilesContext from './FilesContext';

function useFiles() {
  return useContext(FilesContext);
}

export default useFiles;
