import React, { useState } from 'react';

export function useStateWithSessionStorage(sessionStorageKey){
    const [value, setValue] = useState(
      sessionStorage.getItem(sessionStorageKey) || 'false'
    );
  
    React.useEffect((sessionStorageKey) => {
      sessionStorage.setItem(sessionStorageKey, value);
    }, [value]);
  
    return [value, setValue];
};

export function mapStateToProps(state) {
    return { 
        cells: state.cells
    }
}