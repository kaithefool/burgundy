import env from '../config/env';

export function reduceLng(value) {
  return env.lngs.reduce((obj, l, i) => ({
    ...obj,
    [l]: typeof value === 'function'
      ? value(l, env.lngLabels[i])
      : value,
  }), {});
}
export function mapLng(value) {
  return env.lngs.map((l, i) => (
    typeof value === 'function'
      ? value(l, env.lngLabels[i], env.lngFlags[i])
      : value
  ));
}
