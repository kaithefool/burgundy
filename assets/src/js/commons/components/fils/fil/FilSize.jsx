import prettyBytes from 'pretty-bytes';
import useFil from './useFil';

const FilSize = () => {
  const { file: { size } } = useFil();

  return size ? prettyBytes(parseInt(size, 10)) : '';
};

export default FilSize;
