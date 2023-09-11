import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { object, string } from 'yup';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import {
  faCloudUploadAlt,
} from '@fortawesome/free-solid-svg-icons/faCloudUploadAlt';

import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field } from 'formik';
import useDir from './useDir';

const regex = {
  youtube: /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|live\/|v\/)?)([\w-]+)(\S+)?$/,
  vimeo: /(http|https)?:\/\/(www\.|player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/,
};

const urlType = (url = '') => Object.keys(regex)
  .find((k) => url.match(regex[k]));

const DirCloud = ({
  className = 'btn btn-primary px-3',
  accept = ['youtube', 'vimeo'],
}) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const { push } = useDir();

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => setShow(true)}
      >
        <FA icon={faCloudUploadAlt} fixedWidth />
      </button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('external file')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ url: '' }}
            validationSchema={object({
              url: string().url().required().test({
                test: (v) => accept.includes(urlType(v)),
              }),
            })}
            onSubmit={({ url }) => {
              push([{
                type: `cloud/${urlType(url)}`,
                path: url,
              }]);
              setShow(false);
            }}
          >
            {({ isValid, dirty }) => (
              <Form>
                <div className="row g-2">
                  <div className="col">
                    <div className="input-group input-group-input">
                      <span className="input-group-text text-neutral">
                        <FA icon={faLink} />
                      </span>
                      <Field className="form-control" name="url" type="url" />
                      <button
                        type="button"
                        className="btn btn-input"
                      >
                        <FA icon={faTimes} fixedWidth />
                      </button>
                    </div>
                  </div>
                  <div className="col-auto">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={!dirty || !isValid}
                    >
                      {t('add')}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DirCloud;
