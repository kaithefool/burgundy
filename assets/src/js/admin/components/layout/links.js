import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons/faPowerOff';
import {
  faGlobeAmericas,
} from '@fortawesome/free-solid-svg-icons/faGlobeAmericas';

export default [
  [
    {
      icon: faUser,
      label: 'Users',
      to: '/admin/users',
    },
    {
      icon: faGlobeAmericas,
      label: 'Translations',
      to: '/admin/i18n',
    },
  ],
  [
    {
      icon: faPowerOff,
      label: 'Logout',
      href: '/logout',
    },
  ],
];
