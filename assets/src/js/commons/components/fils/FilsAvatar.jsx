import React from 'react';
import { useTranslation } from 'react-i18next';

import Dir from './dir';
import Fil from './fil';

const FilsAvatar = ({
  className,
  accept = 'image/png,image/jpeg,image/svg+xml,image/gif',
  width = 160,
  ...props
}) => {
  const { t } = useTranslation();
  const avatarClassName = `
    ratio ratio-1x1 rounded-circle border
    bg-white
    overflow-hidden
  `;

  const field = (file, status) => (
    <div className="row align-items-center">
      <div className="col-auto" style={{ width: `${width}px` }}>
        <Dir.Click className={avatarClassName} alwaysEnable>
          {file && (
            <>
              <Fil.Preview />
              {status && (
                <div
                  className={`
                    h-auto start-50 top-50 translate-middle
                    ratio ratio-1x1 rounded-circle
                    bg-white bg-opacity-75
                  `}
                  style={{ width: `${width * 0.3}px` }}
                >
                  <div
                    className={`
                      w-auto h-auto start-50 top-50 translate-middle
                      text-center
                    `}
                  >
                    <Fil.Status />
                  </div>
                </div>
              )}
            </>
          )}
        </Dir.Click>
      </div>
      <div className="col-auto">
        <Dir.Click alwaysEnable>
          <button
            type="button"
            className="btn btn-sm btn-secondary"
          >
            {t('selectImage')}
          </button>
        </Dir.Click>
        {file && (
          <Fil.Remove className="btn btn-sm mt-2 btn-outline-secondary">
            {t('remove')}
          </Fil.Remove>
        )}
      </div>
    </div>
  );

  return (
    <Dir
      accept={accept}
      {...props}
    >
      {({ files }) => (
        <Dir.Drop className={className}>
          {files[0] ? (
            <Fil file={files[0]}>
              {({ file, http }) => (
                field(file, http.res.status)
              )}
            </Fil>
          ) : field()}
        </Dir.Drop>
      )}
    </Dir>
  );
};

export default FilsAvatar;
