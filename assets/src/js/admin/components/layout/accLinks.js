import { faUserCircle } from '@fortawesome/free-solid-svg-icons/faUserCircle';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons/faPowerOff';

export default [
  {
    icon: faUserCircle,
    label: 'Account',
    to: '/admin/account',
  },
  {
    icon: faPowerOff,
    label: 'Logout',
    href: '/logout',
  },
];
