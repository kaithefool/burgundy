import React from 'react';

import Fil from './fil';
import Dir from './dir';
import FilsList from './FilsList';
import FilsInput from './FilsInput';

export {
  Fil,
  Dir,
  FilsList,
  FilsInput,
};

const Fils = (props) => <FilsInput {...props} />;

Fils.Fil = Fil;
Fils.Dir = Dir;
Fils.FilsList = FilsList;
Fils.FilsInput = FilsInput;

export default Fils;
