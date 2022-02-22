import { faUser as faReUser } from '@fortawesome/free-regular-svg-icons/faUser';
import { faUserTie } from '@fortawesome/free-solid-svg-icons/faUserTie';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons/faWindowRestore';
import { faHistory } from '@fortawesome/free-solid-svg-icons/faHistory';

export default [
  [
    {
      icon: faUser,
      label: 'Users',
      subDirLabel: 'All',
      to: '/admin/users',
      links: [
        {
          icon: faUserTie,
          label: 'Admins',
          to: '/admin/users/admins',
        },
      ],
    },
    {
      icon: faCog,
      label: 'Settings',
      subDirLabel: null,
      to: '/admin/settings',
      links: [
        {
          icon: faWindowRestore,
          label: 'Views',
          to: '/admin/settings/views',
        },
        {
          icon: faHistory,
          label: 'Access Logs',
          to: '/admin/settings/access-logs',
        },
      ],
    },
  ],
];
