import { string, object, ref } from 'yup';
import { reduceLng } from './helpers';

const lng = (eitherReq = true, schema = string) => object(
  reduceLng(eitherReq ? schema().requiredLng() : schema()),
);

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
  lng,
  email,
  password,
  passwordConfirm,
};
