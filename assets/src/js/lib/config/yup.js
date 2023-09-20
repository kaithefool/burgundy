import { setLocale, addMethod, string } from 'yup';

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
      ...params.resolved && {
        resolved: params.resolved.map((v) => `${v}`),
      },
      rule: `yup.${type}.${rule}`,
    }),
  }), {}),
}), {});

setLocale(locale);

// custom methods
addMethod(string, 'requiredLng', function requiredLng(message) {
  return this.test('requiredLng', message, function testReqLng() {
    const { path, createError, parent } = this;

    if (!Object.values(parent).find((v) => v?.length)) {
      return createError({
        path,
        message: (params) => ({
          ...params,
          rule: 'yup.mixed.required',
          path: path.replace(/\.[^.]*?$/, ''),
        }),
      });
    }

    return true;
  });
});
