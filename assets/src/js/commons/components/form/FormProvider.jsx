import React from 'react';
import { Formik, Form } from 'formik';

import FormHttpContext from './FormContext';
import { initValues, parseValues } from './helpers';
import useHttp from '../../hooks/useHttp';
import FormAlerts from './FormAlerts';

const FormProvider = ({
  stored = {},
  defaults = {},
  relations = [],
  schema,
  children,
  api,
  beforeSubmit = (v) => v,
  onSubmit,
  resetOnSubmitted = false,
  onSubmitted = () => {},
  ...props
}) => {
  const http = useHttp();
  const { req } = http;

  const submitHandler = onSubmit || (
    async (values, actions) => {
      const data = beforeSubmit(
        parseValues(values, relations),
        actions,
      );

      if (data === false) return;

      const r = await req({
        method: 'post',
        data,
        ...api,
      });

      actions.resetForm(resetOnSubmitted ? undefined : { values });
      onSubmitted(r, values);
    }
  );

  return (
    <FormHttpContext.Provider value={{ http }}>
      <Formik
        validationSchema={schema}
        initialValues={initValues(defaults, stored, relations)}
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
