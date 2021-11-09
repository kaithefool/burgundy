import React from 'react';

import useFil from './useFil';
import FilContext from './FilContext';
import FilPreview from './FilPreview';
import FilProvider from './FilProvider';
import FilStatus from './FilStatus';
import FilTypeIcon from './FilTypeIcon';
import FilName from './FilName';
import FilSize from './FilSize';
import FilRemove from './FilRemove';
import FilProgress from './FilProgress';

export {
  useFil,
  FilContext,
  FilPreview,
  FilProvider,
  FilStatus,
  FilTypeIcon,
  FilName,
  FilSize,
  FilRemove,
  FilProgress,
};

const Fil = (props) => <FilProvider {...props} />;

Fil.Context = FilContext;
Fil.Preview = FilPreview;
Fil.Provider = FilProvider;
Fil.Status = FilStatus;
Fil.TypeIcon = FilTypeIcon;
Fil.Name = FilName;
Fil.Size = FilSize;
Fil.Remove = FilRemove;
Fil.Progress = FilProgress;

export default Fil;
