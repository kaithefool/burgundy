import { faUser as faReUser } from '@fortawesome/free-regular-svg-icons/faUser';
import { faUserTie } from '@fortawesome/free-solid-svg-icons/faUserTie';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';

export default [
  [
    {
      icon: faUser,
      label: {
        default: 'Users',
        subDir: 'All',
      },
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
  ],
];
