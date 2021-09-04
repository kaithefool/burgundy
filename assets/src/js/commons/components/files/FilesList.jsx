import React from 'react';

import Folder from './Folder';
import File from './File';

const FilesList = ({
  mode = 'list', // list or gallery
  ...props
}) => (
  <Folder
    {...props}
  >
    {({ files }) => (
      <Folder.Drop>
        <Folder.Click />
        {files.map((f) => (
          <File
            key={f.path || f.key}
          >
            <div className="col">
              <div className="row">
                <div className="col-auto">
                  <File.TypeIcon />
                </div>
                <div className="col">
                  <div className="text-truncate">
                    <File.Name />
                  </div>
                  <File.Size />
                </div>
                <div className="col">
                  <File.StatusIcon />
                </div>
              </div>
            </div>
          </File>
        ))}
      </Folder.Drop>
    )}
  </Folder>
);

export default FilesList;
