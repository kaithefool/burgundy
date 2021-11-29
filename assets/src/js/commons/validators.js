import { string } from 'yup';

const email = () => string()
  .trim()
  .lowercase()
  .email();

const password = () => string()
  .min(8);

export {
  email,
  password,
};
