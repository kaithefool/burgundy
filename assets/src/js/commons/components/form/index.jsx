import React from 'react';

import FormBtnSubmit from './FormBtnSubmit';
import FormField from './FormField';
import FormContext from './FormContext';
import FormProvider from './FormProvider';
import useForm from './useForm';
import * as helpers from './helpers';

import Alert from '../alert';
import FormInput from './FormInput';
import FormCheck from './FormCheck';
import FormSelect from './FormSelect';
import FormFilsList from './FormFilsList';
import FormFilsCoverImg from './FormFilsCoverImg';
import FormFilsAvatar from './FormFilsAvatar';
import FormEditor from './FormEditor';
import FormPassword from './FormPassword';
import FormTextarea from './FormTextarea';
import FormISODateRange from './FormISODateRange';
import FormISODate from './FormISODate';
import FormISOTimeRange from './FormISOTimeRange';
import FormISOTime from './FormISOTime';
import FormISODateTime from './FormISODateTime';
import FormInputGroup from './FormInputGroup';
import FormCoordinates from './FormCoordinates';
import FormEmbedMap from './FormEmbedMap';
import FormArray from './FormArray';
import FormRef from './FormRef';
import FormRefs from './FormRefs';
import FormRefCheck from './FormRefCheck';

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
  FormFilsAvatar,
  FormEditor,
  FormPassword,
  FormTextarea,
  FormISODateRange,
  FormISODate,
  FormISOTimeRange,
  FormISOTime,
  FormISODateTime,
  FormInputGroup,
  FormCoordinates,
  FormEmbedMap,
  FormArray,
  FormRef,
  FormRefs,
  FormRefCheck,
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
Form.FilsAvatar = FormFilsAvatar;
Form.Editor = FormEditor;
Form.Password = FormPassword;
Form.Textarea = FormTextarea;
Form.ISODateRange = FormISODateRange;
Form.ISODate = FormISODate;
Form.ISOTimeRange = FormISOTimeRange;
Form.ISOTime = FormISOTime;
Form.ISODateTime = FormISODateTime;
Form.InputGroup = FormInputGroup;
Form.Coordinates = FormCoordinates;
Form.EmbedMap = FormEmbedMap;
Form.Array = FormArray;
Form.Ref = FormRef;
Form.Refs = FormRefs;
Form.RefCheck = FormRefCheck;

export default Form;
