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
    'Both passwords need to be the same',
  );

export {
  email,
  password,
  passwordConfirm,
};
