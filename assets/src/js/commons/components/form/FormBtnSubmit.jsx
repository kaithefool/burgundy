import React from 'react';
import { faSave } from '@fortawesome/free-regular-svg-icons/faSave';
import { useFormikContext } from 'formik';

import BtnHttp from '../btns/BtnHttp.jsx';

const FormHttpSaveBtn = ({
  res,
  children,
  icon = faSave,
  onlyValid = false,
  ...props
}) => {
  const { dirty, isValid } = useFormikContext();
  const saved = !dirty && res.status === 'success';

  return (
    <BtnHttp
      res={res}
      type="submit"
      icon={icon}
      disabled={!dirty || (onlyValid && !isValid)}
      {...props}
    >
      {children || (saved ? 'Saved' : 'Save')}
    </BtnHttp>
  );
};

export default FormHttpSaveBtn;
