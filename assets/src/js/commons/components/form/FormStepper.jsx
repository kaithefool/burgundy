import React from 'react';
import { useField } from 'formik';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';

import FormInputGroup from './FormInputGroup';
import FormInput from './FormInput';

const FormStepper = ({
  fieldClassName = 'form-control',
  ...props
}) => {
  const {
    name, min, max, step = 1,
  } = props;
  const [{ value }, , { setValue }] = useField(name);
  let v = parseFloat(value);

  if (Number.isNaN(v)) v = min || 0;

  return (
    <FormInputGroup {...props}>
      {({ valid, invalid, ...p }) => (
        <>
          <button
            type="button"
            className="btn btn-input"
            onClick={() => setValue(v - step)}
            disabled={v <= min}
          >
            <FA icon={faMinus} fixedWidth />
          </button>
          <FormInput
            type="number"
            fieldClassName={`no-spin text-center ${fieldClassName}`}
            fieldOnly
            {...p}
          />
          <button
            type="button"
            className="btn btn-input"
            onClick={() => setValue(v + step)}
            disabled={v >= max}
          >
            <FA icon={faPlus} fixedWidth />
          </button>
        </>
      )}
    </FormInputGroup>
  );
};

export default FormStepper;
