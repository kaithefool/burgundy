import { faUser as faReUser } from '@fortawesome/free-regular-svg-icons/faUser';
import { faUserTie } from '@fortawesome/free-solid-svg-icons/faUserTie';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import {
  faGlobeAmericas,
} from '@fortawesome/free-solid-svg-icons/faGlobeAmericas';

export default [
  [
    {
      icon: faUser,
      label: 'Users',
      to: '/admin/users',
      links: [
        {
          icon: faUserTie,
          label: 'Admins',
          to: '/admin/users/admins',
        },
        {
          icon: faReUser,
          label: 'Clients',
          to: '/admin/users/clients',
        },
      ],
    },
    {
      icon: faGlobeAmericas,
      label: 'Translations',
      to: '/admin/i18n',
    },
  ],
];
