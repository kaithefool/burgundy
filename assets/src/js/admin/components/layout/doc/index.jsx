import React from 'react';

import DocProvider from './DocProvider';
import DocContext from './DocContext';
import useDoc from './useDoc';
import DocForm from './DocForm';
import DocBtnDel from './DocBtnDel';
import DocUpdatedAt from './DocUpdatedAt';
import DocBtnPreview from './DocBtnPreview';
import DocCtrls from './DocCtrls';

const Doc = (props) => <DocProvider {...props} />;

export {
  DocProvider,
  DocContext,
  useDoc,
  DocForm,
  DocBtnDel,
  DocUpdatedAt,
  DocBtnPreview,
  DocCtrls,
};

Doc.Provider = DocProvider;
Doc.Form = DocForm;
Doc.BtnDel = DocBtnDel;
Doc.UpdatedAt = DocUpdatedAt;
Doc.BtnPreview = DocBtnPreview;
Doc.Ctrls = DocCtrls;

export default Doc;
