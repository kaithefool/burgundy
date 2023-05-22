import DirClick from './DirClick';
import DirContext from './DirContext';
import DirDrop from './DirDrop';
import DirProvider from './DirProvider';
import useDir from './useDir';
import DirBatchUpload from './DirBatchUpload';

export {
  DirClick,
  DirContext,
  DirDrop,
  DirProvider,
  DirBatchUpload,
  useDir,
};

const Dir = DirProvider;

Dir.Click = DirClick;
Dir.Context = DirContext;
Dir.Drop = DirDrop;
Dir.Provider = DirProvider;
Dir.BatchUpload = DirBatchUpload;

export default Dir;
