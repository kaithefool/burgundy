import { string, ref } from 'yup';

const email = () => string()
  .trim()
  .lowercase()
  .email();

const password = () => string()
  .min(8);

const passwordConfirm = () => string()
  .oneOf(
    [ref('password')],
    (params) => ({ ...params, rule: 'yup.misc.passwordConfirm' }),
  );

export {
  email,
  password,
  passwordConfirm,
};
