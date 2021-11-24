import React from 'react';
import { Formik, Form } from 'formik';

import FormHttpContext from './FormContext';
import helpers from './helpers';
import useHttp from '../../hooks/useHttp';
import FormAlerts from './FormAlerts';

const FormProvider = ({
  stored = {},
  defaults = {},
  schema,
  children,
  api,
  beforeSubmit = (v) => v,
  onSubmit,
  onSubmitted = () => {},
  ...props
}) => {
  const http = useHttp();
  const { req } = http;

  const submitHandler = onSubmit || (
    async (values, actions) => {
      const data = beforeSubmit(values, actions);

      if (data === false) return;

      const r = await req({
        method: 'post',
        data,
        ...api,
      });

      actions.resetForm({ values });
      onSubmitted(r);
    }
  );

  return (
    <FormHttpContext.Provider value={{ http }}>
      <Formik
        validationSchema={schema}
        initialValues={helpers.initValues(defaults, stored)}
        onSubmit={submitHandler}
        {...props}
      >
        {(p) => (
          <Form>
            <FormAlerts />
            {
              typeof children === 'function'
                ? children({ ...p, http })
                : children
            }
          </Form>
        )}
      </Formik>
    </FormHttpContext.Provider>
  );
};

export default FormProvider;
