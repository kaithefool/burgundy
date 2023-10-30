// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useTranslation } from 'react-i18next';
import name from '../name';

const Name = (props) => {
  const { i18n } = useTranslation();

  return name(i18n, props);
};

export default Name;
