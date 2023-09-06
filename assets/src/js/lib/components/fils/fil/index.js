import useFil from './useFil';
import FilContext from './FilContext';
import FilPreview, { isPreviewable } from './FilPreview';
import FilProvider from './FilProvider';
import FilStatus from './FilStatus';
import FilTypeIcon from './FilTypeIcon';
import FilName from './FilName';
import FilSize from './FilSize';
import FilRemove from './FilRemove';
import FilProgress from './FilProgress';
import FilLink from './FilLink';
import FilThumbnail from './FilThumbnail';

export {
  useFil,
  FilContext,
  FilPreview,
  isPreviewable,
  FilProvider,
  FilStatus,
  FilTypeIcon,
  FilName,
  FilSize,
  FilRemove,
  FilProgress,
  FilLink,
  FilThumbnail,
};

const Fil = FilProvider;

Fil.Context = FilContext;
Fil.Preview = FilPreview;
Fil.Provider = FilProvider;
Fil.Status = FilStatus;
Fil.TypeIcon = FilTypeIcon;
Fil.Name = FilName;
Fil.Size = FilSize;
Fil.Remove = FilRemove;
Fil.Progress = FilProgress;
Fil.Link = FilLink;
Fil.Thumbnail = FilThumbnail;

export default Fil;
