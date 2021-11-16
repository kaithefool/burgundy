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
import FormFilsList from './FormFilsList';
import FormFilsCoverImg from './FormFilsCoverImg';

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
  FormFilsList,
  FormFilsCoverImg,
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
Form.FilsList = FormFilsList;
Form.FilsCoverImg = FormFilsCoverImg;

export default Form;
