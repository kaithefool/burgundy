import DirClick from './DirClick';
import DirContext from './DirContext';
import DirDrop from './DirDrop';
import DirProvider from './DirProvider';
import useDir from './useDir';
import DirBatchUpload from './DirBatchUpload';
import DirCloud from './DirCloud';

export {
  DirClick,
  DirContext,
  DirDrop,
  DirProvider,
  DirBatchUpload,
  DirCloud,
  useDir,
};

const Dir = DirProvider;

Dir.Click = DirClick;
Dir.Context = DirContext;
Dir.Drop = DirDrop;
Dir.Provider = DirProvider;
Dir.BatchUpload = DirBatchUpload;
Dir.Cloud = DirCloud;

export default Dir;
