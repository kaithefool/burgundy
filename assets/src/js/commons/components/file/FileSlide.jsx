import React, { useEffect, useState } from 'react';
import prettyBytes from 'pretty-bytes';

import Pending from '../../util/Pending.jsx';
import { useHttpFileUpload } from '../../../hooks/useHttp';

function isThumbnailable(mime) {
  return [
    'image/gif',
    'image/jpeg',
    'image/png',
  ].includes(mime);
}

const FileSlide = ({
  className,
  api,
  file = null,
  value,
  onChange = () => {},
  children,
}) => {
  const [{
    status, payload, progress,
  }, req] = useHttpFileUpload();
  const [display, setDisplay] = useState(null);

  // on new file
  useEffect(() => {
    if (file) {
      req(api, file);

      setDisplay({
        name: file.name,
        size: file.size,
        mime: file.type,
        preview: isThumbnailable(file.type)
          ? URL.createObjectURL(file)
          : null,
      });
    }
  }, [
    file === null,
    file?.name,
    file?.lastModified,
  ]);

  // on file uploaded
  useEffect(() => {
    if (status === 'success') {
      onChange(payload);
    }
  }, [status]);

  // on value changed
  useEffect(() => {
    setDisplay({
      ...value,
      preview: isThumbnailable(value.mime)
        ? value.url : null,
    });
  }, [value]);

  return (
    <div className={className}>
      {display?.preview && (
        <div
          className="img-bg"
          style={{ backgroundImage: `url('${display.preview}')` }}
        />
      )}
      {display && (
        <div>
          {display?.name}
          &nbsp;
          {display.size && prettyBytes(display.size)}
        </div>
      )}
      {status === 'pending' && (
        <Pending progress={progress} />
      )}
      {children}
    </div>
  );
};

export default FileSlide;
