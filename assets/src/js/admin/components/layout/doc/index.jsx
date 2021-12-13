import React from 'react';

import DocProvider from './DocProvider';
import DocContext from './DocContext';
import useDoc from './useDoc';
import DocForm from './DocForm';
import DocBtnDel from './DocBtnDel';
import DocUpdatedAt from './DocUpdatedAt';
import DocBtnPreview from './DocBtnPreview';


const Doc = (props) => <DocProvider {...props} />;

export {
  DocProvider,
  DocContext,
  useDoc,
  DocForm,
  DocBtnDel,
  DocUpdatedAt,
  DocBtnPreview,
};

Doc.Provider = DocProvider;
Doc.Form = DocForm;
Doc.BtnDel = DocBtnDel;
Doc.UpdatedAt = DocUpdatedAt;
Doc.BtnPreview = DocBtnPreview;

export default Doc;
