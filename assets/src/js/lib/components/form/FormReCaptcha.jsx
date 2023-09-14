import React, {
  useState, useRef, useCallback, useEffect,
} from 'react';
import { useField, useFormikContext } from 'formik';
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from 'react-google-recaptcha-v3';

import env from '../../config/env';
import useInterval from '../../hooks/useInterval';

const publicKey = env.googleReCaptchaKey;

const FormReCaptcha = ({
  name = 'reCaptchaToken',
  action,
}) => {
  const { submitCount } = useFormikContext();
  const [, , { setValue }] = useField(name);
  const [refresh, setRefresh] = useState(0);
  const ref = useRef(setValue);

  ref.current = setValue;
  const stableSetValue = useCallback((token) => ref.current(token), []);

  // refresh
  useInterval(() => setRefresh((c) => c + 1), 30 * 1000, true);
  useEffect(() => setRefresh((c) => c + 1), [submitCount]);

  return (
    <GoogleReCaptchaProvider reCaptchaKey={publicKey}>
      <GoogleReCaptcha
        action={action}
        onVerify={stableSetValue}
        refreshReCaptcha={refresh}
      />
    </GoogleReCaptchaProvider>
  );
};

export default FormReCaptcha;
