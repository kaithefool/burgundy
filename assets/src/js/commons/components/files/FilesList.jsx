import React, { useState } from 'react';

import FilesClick from './FilesClick.jsx';
import FilesDrop from './FilesDrop.jsx';
import File from './file';

const FilesList = ({
  api,
  initValue = [],
  multiple = false,
  onChange = () => {},
  reorderable = false,
}) => {
  const [files, setFiles] = useState(initValue);

  const push = (fs) => {
    if (multiple) {
      setFiles(files.concat(fs).slice(0, Number(multiple)));
    } else {
      setFiles([fs[0]]);
    }
  };

  const remove = () => {

  };

  return (
    <FilesDrop onFile={push}>
      <FilesClick onFile={push} />
      {files.map((f) => (
        <File
          file={f}
          onChange={() => {}}
        >
          
        </File>
      ))}
    </FileDrop>
  );
};

export default FilesList;
