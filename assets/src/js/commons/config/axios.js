import axios from 'axios';
import env from './env';

axios.defaults.headers.common['x-csrf-token'] = env.csrf;

export default axios;
