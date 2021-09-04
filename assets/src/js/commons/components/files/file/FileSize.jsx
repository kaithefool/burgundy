import prettyBytes from 'pretty-bytes';
import useFile from './useFile';

const FileSize = () => {
  const { file: { size } } = useFile();

  return size ? prettyBytes(size) : '';
};

export default FileSize;
