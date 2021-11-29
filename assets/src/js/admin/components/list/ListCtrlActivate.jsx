import React from 'react';

import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { faUnlock } from '@fortawesome/free-solid-svg-icons/faUnlock';

import List, { useList } from '~/commons/components/list';

const ListCtrlActivate = ({ api: apiOpts }) => {
  const { selected, api: listApi } = useList();
  const hasSelectedActive = Boolean(selected.find((r) => r.active));
  const hasSelectedInactive = Boolean(selected.find((r) => !r.active));
  const api = {
    ...listApi,
    url: `${listApi.url}/active`,
    ...apiOpts,
  };

  return (
    <>
      {hasSelectedInactive && (
        <List.Ctrl.Patch
          api={api}
          icon={faUnlock}
          updates={{ active: true }}
        />
      )}
      {hasSelectedActive && (
        <List.Ctrl.Patch
          api={api}
          icon={faLock}
          updates={{ active: false }}
        />
      )}
    </>
  );
};

export default ListCtrlActivate;
