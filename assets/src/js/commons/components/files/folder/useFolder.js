import { useContext } from 'react';

import FolderContext from './FolderContext';

function useFolder() {
  return useContext(FolderContext);
}

export default useFolder;
