import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons/faPowerOff';

export default [
  {
    icon: faUser,
    label: 'Users',
    to: '/admin/users',
  },
  { divider: true },
  {
    icon: faPowerOff,
    label: 'Logout',
    href: '/logout',
  },
];
