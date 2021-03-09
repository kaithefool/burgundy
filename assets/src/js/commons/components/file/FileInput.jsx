import React from 'react';

import FileClick from './FileClick.jsx';
import FileDrop from './FileDrop.jsx';

const FileInput = ({
  fileDrop = true,
  fileClick = true,
  onFile = () => {},
  children,
  ...props
}) => {
  let toRender = children;

  if (fileDrop) {
    toRender = (
      <FileDrop
        onDrop={onFile}
      >
        {toRender}
      </FileDrop>
    );
  }
  if (fileClick) {
    toRender = (
      <FileClick
        onFile={onFile}
      >
        {toRender}
      </FileClick>
    );
  }

  return toRender;
};

export default FileInput;
