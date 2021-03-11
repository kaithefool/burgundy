import React from 'react';
import { Formik, Form as FormikForm } from 'formik';

import form from '../../helpers/form';

const Form = ({
  stored,
  defaults,
  schema,
  children,
  ...props
}) => (
  <Formik
    validationSchema={schema}
    initialValues={form.initValues(defaults, stored)}
    {...props}
  >
    {(p) => (
      <FormikForm>
        {typeof children === 'function' ? children(p) : children}
      </FormikForm>
    )}
  </Formik>
);

export default Form;
