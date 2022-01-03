import React from 'react';

import FormBtnSubmit from './FormBtnSubmit';
import FormField from './FormField';
import FormContext from './FormContext';
import FormProvider from './FormProvider';
import useForm from './useForm';
import helpers from './helpers';

import Alert from '../alert';
import FormInput from './FormInput';
import FormCheck from './FormCheck';
import FormSelect from './FormSelect';
import FormFilsList from './FormFilsList';
import FormFilsCoverImg from './FormFilsCoverImg';
import FormEditor from './FormEditor';
import FormPassword from './FormPassword';
import FormMap from './FormMap';
import FormTextarea from './FormTextarea';
import FormISODateRange from './FormISODateRange';
import FormISODate from './FormISODate';
import FormISOTimeRange from './FormISOTimeRange';
import FormISOTime from './FormISOTime';

export {
  FormContext,
  FormProvider,
  useForm,
  helpers,
  FormBtnSubmit,
  FormField,
  FormInput,
  FormCheck,
  FormSelect,
  FormFilsList,
  FormFilsCoverImg,
  FormEditor,
  FormPassword,
  FormMap,
  FormTextarea,
  FormISODateRange,
  FormISODate,
  FormISOTimeRange,
  FormISOTime,
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
Form.Editor = FormEditor;
Form.Password = FormPassword;
Form.Map = FormMap;
Form.Textarea = FormTextarea;
Form.ISODateRange = FormISODateRange;
Form.ISODate = FormISODate;
Form.ISOTimeRange = FormISOTimeRange;
Form.ISOTime = FormISOTime;

export default Form;
