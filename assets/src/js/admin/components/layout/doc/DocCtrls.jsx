import React from 'react';

import Form from '~/commons/components/form';
import DocUpdatedAt from './DocUpdatedAt';
import DocBtnDel from './DocBtnDel';
import DocBtnPreview from './DocBtnPreview';

const DocCtrls = ({
  submit = true,
  preview = false,
  updatedAt = true,
  del = true,
}) => (
  <div className="row mb-3 align-items-center">
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
    {updatedAt && (
      <div className="col-auto">
        <DocUpdatedAt />
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
