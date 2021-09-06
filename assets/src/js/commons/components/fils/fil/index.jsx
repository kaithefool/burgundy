import React from 'react';

import FilContext from './FilContext';
import FilPreview from './FilPreview';
import FilProvider from './FilProvider';
import FilStatusIcon from './FilStatusIcon';
import FilTypeIcon from './FilTypeIcon';
import FilName from './FilName';
import FilSize from './FilSize';
import useFil from './useFil';

export {
  FilContext,
  FilPreview,
  FilProvider,
  FilStatusIcon,
  FilTypeIcon,
  FilName,
  FilSize,
  useFil,
};

const Fil = (props) => <FilProvider {...props} />;

Fil.Context = FilContext;
Fil.Preview = FilPreview;
Fil.Provider = FilProvider;
Fil.StatusIcon = FilStatusIcon;
Fil.TypeIcon = FilTypeIcon;
Fil.Name = FilName;
Fil.Size = FilSize;

console.log(Fil);

export default Fil;
