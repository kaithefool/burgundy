import React from 'react';
import { Formik, Form as FormikForm } from 'formik';

import FormHttpContext from './FormHttpContext';
import form from '../../helpers/form';
import useHttp from '../../hooks/useHttp';

import FormAlert from './FormAlert.jsx';

const FormProvider = ({
  stored,
  defaults,
  schema,
  children,
  api,
  onSubmit,
  ...props
}) => {
  const formHttp = useHttp();
  const submitHandler = onSubmit || (
    (values, { req }) => req({
      method: 'post',
      data: values,
      ...api,
    })
  );

  return (
    <FormHttpContext.Provider values={formHttp}>
      <Formik
        validationSchema={schema}
        initialValues={form.initValues(defaults, stored)}
        onSubmit={async (values, actions) => {
          await submitHandler(values, formHttp, actions);
          actions.resetForm({ values });
        }}
        {...props}
      >
        {(p) => (
          <FormikForm>
            <FormAlert />
            {typeof children === 'function'
              ? children({ ...p, ...formHttp })
              : children
            }
          </FormikForm>
        )}
      </Formik>
    </FormHttpContext.Provider>
  );
};

export default FormProvider;
