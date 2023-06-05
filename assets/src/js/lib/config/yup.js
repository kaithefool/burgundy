import { setLocale } from 'yup';

const rules = {
  mixed: [
    'default',
    'required',
    'oneOf',
    'notOneOf',
    'notType',
  ],
  string: [
    'length',
    'min',
    'max',
    'matches',
    'email',
    'url',
    'trim',
    'lowercase',
    'uppercase',
  ],
  number: [
    'min',
    'max',
    'lessThan',
    'moreThan',
    'positive',
    'negative',
    'integer',
  ],
  date: [
    'min',
    'max',
  ],
  boolean: [
    'isValue',
  ],
  object: [
    'notKnown',
  ],
  array: [
    'min',
    'max',
    'length',
  ],
};

const locale = Object.keys(rules).reduce((l, type) => ({
  ...l,
  [type]: rules[type].reduce((typeRules, rule) => ({
    ...typeRules,
    [rule]: (params) => ({
      ...params,
      rule: `yup.${type}.${rule}`,
    }),
  }), {}),
}), {});

setLocale(locale);
