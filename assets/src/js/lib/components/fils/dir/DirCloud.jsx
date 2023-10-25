import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { object, string } from 'yup';
import inflect from 'inflect';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import {
  faCloudUploadAlt,
} from '@fortawesome/free-solid-svg-icons/faCloudUploadAlt';

import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field } from 'formik';
import useDir from './useDir';
import useUniqKey from '~/lib/hooks/useUniqKey';

const regex = {
  youtube: /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|live\/|v\/)?)([\w-]+)(\S+)?$/,
  vimeo: /(http|https)?:\/\/(www\.|player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/,
};

const urlType = (url = '') => Object.keys(regex)
  .find((k) => url.match(regex[k]));

const DirCloud = ({
  className = 'btn btn-primary px-3',
  accept = ['youtube', 'vimeo'],
  alwaysEnable = false,
}) => {
  const [id] = useUniqKey();
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const { push, multiple, files } = useDir();

  if (!alwaysEnable && !multiple && files.length) return '';

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
      >
        <Modal.Header closeButton />
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
            {({
              isValid, dirty, values, setValues,
            }) => (
              <Form>
                <label htmlFor={id} className="form-label">
                  {t('acceptCloudTypes', {
                    types: accept.map((ty) => inflect.capitalize(ty)),
                  })}
                </label>
                <div className="input-group input-group-input">
                  <span className="input-group-text text-neutral">
                    <FA icon={faLink} />
                  </span>
                  <Field
                    id={id}
                    className="form-control"
                    name="url"
                    type="url"
                  />
                  {values.url && (
                  <button
                    type="button"
                    className="btn btn-input"
                    onClick={() => setValues({ url: '' })}
                  >
                    <FA icon={faTimes} fixedWidth />
                  </button>
                  )}
                </div>
                <div className="text-end mt-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!dirty || !isValid}
                  >
                    {t('addCloudFile')}
                  </button>
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
