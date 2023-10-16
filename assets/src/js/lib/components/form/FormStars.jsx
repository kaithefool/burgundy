import React from 'react';
import { useField } from 'formik';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faStar as faReStar } from '@fortawesome/free-regular-svg-icons/faStar';
import FormField from './FormField';

const FormStars = ({
  max = 5,
  btnClassName = 'btn text-primary px-2 py-1',
  ...props
}) => {
  const { name } = props;
  const [{ value },, { setValue }] = useField(name);

  return (
    <FormField {...props}>
      {({ disabled }) => (
        <div>
          {Array.from({ length: max }).map((k, i) => (
            <button
              key={i}
              type="button"
              className={btnClassName}
              onClick={() => setValue(i + 1)}
              disabled={disabled}
            >
              <FA icon={i + 1 <= value ? faStar : faReStar} />
            </button>
          ))}
        </div>
      )}
    </FormField>
  );
};

export default FormStars;
