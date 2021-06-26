import React from 'react';
import { Formik, Form } from 'formik';

import FormHttpContext from './FormHttpContext';
import form from '../../helpers/form';
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
  const formHttp = useHttp();
  const { req } = formHttp;

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
            {
              typeof children === 'function'
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
