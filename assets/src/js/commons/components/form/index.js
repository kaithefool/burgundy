import React from 'react';

import FormBtnSubmit from './FormBtnSubmit.jsx';
import FormField from './FormField.jsx';
import FormHttpContext from './FormHttpContext';
import FormProvider from './FormProvider.jsx';
import useFormHttp from './useFormHttp';

export {
  FormBtnSubmit,
  FormField,
  FormHttpContext,
  FormProvider,
  useFormHttp,
};

const Form = (props) => <FormProvider {...props} />;

Form.BtnSubmit = FormBtnSubmit;
Form.Field = FormField;

export default Form;
