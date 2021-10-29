import React from 'react';

import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { faUnlock } from '@fortawesome/free-solid-svg-icons/faUnlock';

import List, { useList } from '~/commons/components/list';

const ListCtrlActivate = () => {
  const { selected } = useList();
  const hasSelectedActive = Boolean(selected.find((r) => r.active));
  const hasSelectedInactive = Boolean(selected.find((r) => !r.active));

  return (
    <>
      {hasSelectedInactive && (
        <List.Ctrl.Patch
          icon={faUnlock}
          updates={{ active: true }}
        />
      )}
      {hasSelectedActive && (
        <List.Ctrl.Patch
          icon={faLock}
          updates={{ active: false }}
        />
      )}
    </>
  );
};

export default ListCtrlActivate;
