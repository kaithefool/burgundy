import useFil from './useFil';

const FilName = () => {
  const { file: { name } } = useFil();

  return name;
};

export default FilName;
