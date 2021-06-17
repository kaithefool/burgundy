import React from 'react';

import FormBtnSubmit from './FormBtnSubmit';
import FormField from './FormField';
import FormHttpContext from './FormHttpContext';
import FormProvider from './FormProvider';
import useFormHttp from './useFormHttp';

import Alert from '../alert';

export {
  FormBtnSubmit,
  FormField,
  FormHttpContext,
  FormProvider,
  useFormHttp,
};

const Form = ({
  alert = {},
  ...props
}) => (
  alert
    ? <Alert {...alert}><FormProvider {...props} /></Alert>
    : <FormProvider {...props} />
);

Form.BtnSubmit = FormBtnSubmit;
Form.Field = FormField;

export default Form;
