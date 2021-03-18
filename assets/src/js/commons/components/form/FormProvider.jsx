import React from 'react';
import { Formik, Form } from 'formik';

import FormHttpContext from './FormHttpContext';
import form from '../../helpers/form';
import useHttp from '../../hooks/useHttp';
import { useAlert } from '../alert';

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
  const { res, req } = formHttp;
  const { push: pushAlert } = useAlert(res);

  const submitHandler = onSubmit || (
    async (values, actions) => {
      await req({
        method: 'post',
        data: values,
        ...api,
      });

      actions.resetForm({ values });
    }
  );

  return (
    <FormHttpContext.Provider values={formHttp}>
      <Formik
        validationSchema={schema}
        initialValues={form.initValues(defaults, stored)}
        onSubmit={submitHandler}
        {...props}
      >
        {(p) => (
          <Form>
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
