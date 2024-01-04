import i18n from '../../../config/i18n';

export default function errorParser(err) {
  const { response, message, code } = err;
  let payload;

  if (message === 'Network Error') {
    payload = { message: i18n.t('res.disconnected') };
  } else if (code === 'ECONNABORTED') {
    payload = { message: i18n.t('res.timeout') };
  } else {
    payload = response?.data;
  }

  return {
    status: 'error',
    payload,
    code: response ? response.status : null,
    progress: 0,
  };
}
