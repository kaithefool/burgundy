import React from 'react';

import DocProvider from './DocProvider';
import DocContext from './DocContext';
import useDoc from './useDoc';
import DocForm from './DocForm';
import DocBtnDel from './DocBtnDel';
import DocUpdatedAt from './DocUpdatedAt';

const Doc = (props) => <DocProvider {...props} />;

export {
  DocProvider,
  DocContext,
  useDoc,
  DocForm,
  DocBtnDel,
  DocUpdatedAt,
};

Doc.Provider = DocProvider;
Doc.Form = DocForm;
Doc.BtnDel = DocBtnDel;
Doc.UpdatedAt = DocUpdatedAt;

export default Doc;
