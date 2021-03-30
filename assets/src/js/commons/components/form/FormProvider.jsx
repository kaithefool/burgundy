import React from 'react';
import { Formik, Form } from 'formik';

import FormHttpContext from './FormHttpContext';
import form from '../../helpers/form';
import useHttp from '../../hooks/useHttp';
import FormAlerts from './FormAlerts.jsx';

const FormProvider = ({
  stored,
  defaults,
  schema,
  children,
  api,
  onSubmit,
  onSubmitted = () => {},
  ...props
}) => {
  const formHttp = useHttp();
  const { req } = formHttp;

  const submitHandler = onSubmit || (
    async (values, actions) => {
      await req({
        method: 'post',
        data: values,
        ...api,
      });

      actions.resetForm({ values });
      onSubmitted();
    }
  );

  return (
    <FormHttpContext.Provider value={formHttp}>
      <Formik
        validationSchema={schema}
        initialValues={form.initValues(defaults, stored)}
        onSubmit={submitHandler}
        {...props}
      >
        {(p) => (
          <Form>
            <FormAlerts />
            {typeof children === 'function'
              ? children({ ...p, ...formHttp })
              : children
            }
          </Form>
        )}
      </Formik>
    </FormHttpContext.Provider>
  );
};

export default FormProvider;
