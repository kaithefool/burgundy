import React from 'react';

import FormBtnSubmit from './FormBtnSubmit';
import FormField from './FormField';
import FormHttpContext from './FormHttpContext';
import FormProvider from './FormProvider';
import useFormHttp from './useFormHttp';
import helpers from './helpers';

import Alert from '../alert';
import FormInput from './FormInput';
import FormCheck from './FormCheck';
import FormSelect from './FormSelect';

export {
  FormHttpContext,
  FormProvider,
  useFormHttp,
  helpers,
  FormBtnSubmit,
  FormField,
  FormInput,
  FormCheck,
  FormSelect,
};

const Form = ({
  alert,
  ...props
}) => (
  alert
    ? <Alert {...alert}><FormProvider {...props} /></Alert>
    : <FormProvider {...props} />
);

Form.BtnSubmit = FormBtnSubmit;
Form.Field = FormField;
Form.Input = FormInput;
Form.Check = FormCheck;
Form.Select = FormSelect;

export default Form;
