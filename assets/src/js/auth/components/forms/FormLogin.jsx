import React from 'react';
import { Link } from 'react-router-dom';

import { object, string } from 'yup';

const schema = object({
  email: string()
    .trim()
    .lowercase()
    .email('必須為有效電郵地址')
    .required('必填'),
  password: string()
    .required('必填'),
});
const defaults = {
  email: '',
  password: '',
};
