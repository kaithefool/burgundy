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
import FormTextarea from './FormTextarea';
import FormISODateRange from './FormISODateRange';
import FormISODate from './FormISODate';
import FormISOTimeRange from './FormISOTimeRange';
import FormISOTime from './FormISOTime';
import FormInputGroup from './FormInputGroup';
import FormCoordinates from './FormCoordinates';
import FormMap from './FormMap';
import FormArray from './FormArray';
import FormRef from './FormRef';

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
  FormTextarea,
  FormISODateRange,
  FormISODate,
  FormISOTimeRange,
  FormISOTime,
  FormInputGroup,
  FormCoordinates,
  FormMap,
  FormArray,
  FormRef,
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
Form.Textarea = FormTextarea;
Form.ISODateRange = FormISODateRange;
Form.ISODate = FormISODate;
Form.ISOTimeRange = FormISOTimeRange;
Form.ISOTime = FormISOTime;
Form.InputGroup = FormInputGroup;
Form.Coordinates = FormCoordinates;
Form.Map = FormMap;
Form.Array = FormArray;
Form.Ref = FormRef;

export default Form;
