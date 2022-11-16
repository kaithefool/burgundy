import React from 'react';

import Form from '~/commons/components/form';
import DocUpdatedAt from './DocUpdatedAt';
import DocCreatedAt from './DocCreatedAt';
import DocBtnDel from './DocBtnDel';
import DocBtnPreview from './DocBtnPreview';

const DocCtrls = ({
  submit = true,
  preview = false,
  createdAt = false,
  updatedAt = false,
  del = false,
  children,
}) => (
  <div className="row mb-3 gx-3 align-items-center">
    {submit && (
      <div className="col-auto">
        <Form.BtnSubmit />
      </div>
    )}
    {preview && (
      <div className="col-auto">
        <DocBtnPreview href={preview} />
      </div>
    )}
    {children}
    {(updatedAt || createdAt) && (
      <div className="col-auto">
        {updatedAt && (
          <div><DocUpdatedAt /></div>
        )}
        {createdAt && (
          <div><DocCreatedAt /></div>
        )}
      </div>
    )}
    {del && (
      <div className="col text-end">
        <DocBtnDel />
      </div>
    )}
  </div>
);

export default DocCtrls;
