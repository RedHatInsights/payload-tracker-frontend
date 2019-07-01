import React, { useState } from 'react';
import { textCenter } from '@patternfly/react-table';

export function useStateWithSessionStorage(sessionStorageKey){
    const [value, setValue] = useState(
      sessionStorage.getItem(sessionStorageKey) || ''
    );
  
    React.useEffect(() => {
      sessionStorage.setItem(sessionStorageKey, value);
    }, [value]);
  
    return [value, setValue];
};

export const Cells = [
  {
      title: 'id',
      isActive: true,
      transforms: [textCenter],
      cellTransforms: [textCenter],
  },{
      title: 'service',
      isActive: true,
      transforms: [textCenter],
      cellTransforms: [textCenter],
  },{
      title: 'source',
      isActive: true,
      transforms: [textCenter],
      cellTransforms: [textCenter],
  },{
      title: 'account',
      isActive: true,
      transforms: [textCenter],
      cellTransforms: [textCenter],
  },{
      title: 'payload_id',
      isActive: true,
      transforms: [textCenter],
      cellTransforms: [textCenter],
  },{
      title: 'inventory_id',
      isActive: true,
      transforms: [textCenter],
      cellTransforms: [textCenter],
  },{
      title: 'system_id',
      isActive: true,
      transforms: [textCenter],
      cellTransforms: [textCenter],
  },{
      title: 'status',
      isActive: true,
      transforms: [textCenter],
      cellTransforms: [textCenter],
  },{
      title: 'status_msg',
      isActive: true,
      transforms: [textCenter],
      cellTransforms: [textCenter],
  },{
      title: 'date',
      isActive: true,
      transforms: [textCenter],
      cellTransforms: [textCenter],
  },{
      title: 'created_at',
      isActive: true,
      transforms: [textCenter],
      cellTransforms: [textCenter],
  }
];