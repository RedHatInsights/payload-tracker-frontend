import React, { useState } from 'react';
import { textCenter } from '@patternfly/react-table';

export function useStateWithSessionStorage(sessionStorageKey){
    const [value, setValue] = useState(
      sessionStorage.getItem(sessionStorageKey) || 'false'
    );
  
    React.useEffect(() => {
      sessionStorage.setItem(sessionStorageKey, value);
    }, [value]);
  
    return [value, setValue];
};

export function mapStateToProps(state) {
    return { 
        cells: state.cells
    }
}