import React from 'react';

import FormBtnSubmit from './FormBtnSubmit';
import FormField from './FormField';
import FormLabel from './FormLabel';
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
import FormPassword from './FormPassword';
import FormTextarea from './FormTextarea';
import FormISODateRange from './FormISODateRange';
import FormISODate from './FormISODate';
import FormISOTimeRange from './FormISOTimeRange';
import FormISOTime from './FormISOTime';
import FormISODateTime from './FormISODateTime';
import FormInputGroup from './FormInputGroup';
import FormLngGroup from './FormLngGroup';
import FormCoordinates from './FormCoordinates';
import FormEmbedMap from './FormEmbedMap';
import FormArray from './FormArray';
import FormRef from './FormRef';
import FormRefs from './FormRefs';
import FormRefCheck from './FormRefCheck';
import FormOtpAuth from './FormOtpAuth';
import FormStepper from './FormStepper';
import FormReCaptcha from './FormReCaptcha';
import FormStars from './FormStars';

export {
  FormContext,
  FormProvider,
  useForm,
  helpers,
  FormBtnSubmit,
  FormField,
  FormLabel,
  FormInput,
  FormCheck,
  FormSelect,
  FormFilsList,
  FormFilsCoverImg,
  FormFilsAvatar,
  FormPassword,
  FormTextarea,
  FormISODateRange,
  FormISODate,
  FormISOTimeRange,
  FormISOTime,
  FormISODateTime,
  FormInputGroup,
  FormLngGroup,
  FormCoordinates,
  FormEmbedMap,
  FormArray,
  FormRef,
  FormRefs,
  FormRefCheck,
  FormOtpAuth,
  FormStepper,
  FormReCaptcha,
  FormStars,
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
Form.Label = FormLabel;
Form.Input = FormInput;
Form.Check = FormCheck;
Form.Select = FormSelect;
Form.FilsList = FormFilsList;
Form.FilsCoverImg = FormFilsCoverImg;
Form.FilsAvatar = FormFilsAvatar;
Form.Password = FormPassword;
Form.Textarea = FormTextarea;
Form.ISODateRange = FormISODateRange;
Form.ISODate = FormISODate;
Form.ISOTimeRange = FormISOTimeRange;
Form.ISOTime = FormISOTime;
Form.ISODateTime = FormISODateTime;
Form.InputGroup = FormInputGroup;
Form.LngGroup = FormLngGroup;
Form.Coordinates = FormCoordinates;
Form.EmbedMap = FormEmbedMap;
Form.Array = FormArray;
Form.Ref = FormRef;
Form.Refs = FormRefs;
Form.RefCheck = FormRefCheck;
Form.OtpAuth = FormOtpAuth;
Form.Stepper = FormStepper;
Form.ReCaptcha = FormReCaptcha;
Form.Stars = FormStars;

export default Form;
