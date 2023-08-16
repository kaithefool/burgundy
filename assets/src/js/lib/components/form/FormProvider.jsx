import React, { useRef, useEffect } from 'react';
import { Formik, Form, useFormikContext } from 'formik';

import FormHttpContext from './FormContext';
import { initValues, parseValues } from './helpers';
import useHttp from '../../hooks/useHttp';
import useForm from './useForm';
import FormAlerts from './FormAlerts';

const FormAttemp = () => {
  const { attempValues } = useForm();
  const { isSubmitting } = useFormikContext();

  // clear attemp values on submit
  useEffect(() => {
    if (!isSubmitting) {
      attempValues.current = {};
    }
  }, [isSubmitting]);

  return '';
};

const FormProvider = ({
  alertOpts,
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
  const attempValues = useRef({});
  const http = useHttp();
  const { req } = http;

  const attemp = (val) => Object.assign(attempValues.current, val);

  const submitHandler = onSubmit || (
    async (values, actions) => {
      const data = beforeSubmit(
        parseValues({ ...values, ...attempValues.current }, relations),
        actions,
      );

      if (data === false) return;

      const r = await req({
        method: 'post',
        data,
        ...typeof api === 'function' ? api(data) : api,
      });

      actions.resetForm(resetOnSubmitted ? undefined : { values });
      onSubmitted(r, values, data);
    }
  );

  return (
    <FormHttpContext.Provider value={{ http, attemp, attempValues }}>
      <Formik
        validationSchema={schema}
        initialValues={initValues(defaults, stored, relations)}
        onSubmit={submitHandler}
        {...props}
      >
        {(p) => (
          <Form>
            <FormAttemp />
            <FormAlerts opts={alertOpts} />
            {
              typeof children === 'function'
                ? children({
                  ...p, http, attemp, attempValues,
                })
                : children
            }
          </Form>
        )}
      </Formik>
    </FormHttpContext.Provider>
  );
};

export default FormProvider;
