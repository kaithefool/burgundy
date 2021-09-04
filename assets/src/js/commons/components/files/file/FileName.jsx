import useFile from './useFile';

const FileName = () => {
  const { file: { name } } = useFile();

  return name;
};

export default FileName;
