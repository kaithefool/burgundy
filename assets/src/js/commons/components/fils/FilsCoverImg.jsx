import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

import { useTranslation } from 'react-i18next';
import Dir from './dir';
import Fil from './fil';

const FilsCoverImg = ({
  className,
  accept = 'image/png,image/jpeg,image/svg+xml,image/gif',
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <Dir
      accept={accept}
      {...props}
    >
      {({ files }) => (
        <Dir.Drop
          className={`
            ${className}
            position-relative h-auto ratio ratio-21x9 max-vh-50
          `}
        >
          {files[0] && (
            <Fil file={files[0]}>
              <div>
                <Fil.Preview />
                <div className="position-relative" style={{ zIndex: 1 }}>
                  {/* background */}
                  <div
                    className={`
                      bg-white position-absolute h-100 w-100 opacity-75
                    `}
                  />
                  {/* info */}
                  <div className="position-relative">
                    <Fil.Progress />
                    <div className="px-3">
                      <div className="row g-2 align-items-center">
                        <div className="col-auto text-primary">
                          <Fil.TypeIcon fixedWidth />
                        </div>
                        <div className="col">
                          <Fil.Name />
                        </div>
                        <div className="col-auto">
                          <small className="text-muted"><Fil.Size /></small>
                        </div>
                        <div className="col-auto">
                          <Fil.Status />
                        </div>
                        <div className="col-auto">
                          <Fil.Remove className="btn text-secondary" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Fil>
          )}
          <Dir.Click alwaysEnable>
            <div
              className={`
                btn btn-secondary px-3
                position-absolute top-50 start-50 translate-middle-x
              `}
            >
              <FA icon={faPlus} fixedWidth className="me-2" />
              {t('selectImage')}
            </div>
          </Dir.Click>
        </Dir.Drop>
      )}
    </Dir>
  );
};

export default FilsCoverImg;
