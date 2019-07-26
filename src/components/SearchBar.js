import React, { useState } from 'react';
import DropdownContainer from './DropdownContainer';
import { Chip, Button, TextInput } from '@patternfly/react-core';
import {
  removeStartDate, removeEndDate, addPayloadsFilter, 
  setPayloadsPage, removePayloadsFilter, removePayloadsPage 
} from '../actions';
import { FILTER_TYPES } from '../AppConstants';

const ChipContainer = props => {
  return(
    <div style={{float:'right'}}>
      {props.filters.map(chip =>
        <React.Fragment>
          <Chip key={chip.id} onClick={() => props.closeChip(chip.id)}>
            {chip.type + '=' + chip.value}
          </Chip>
        </React.Fragment>
      )}
    </div>
  )
}

export default props => {

  const [isFilterInOpen, setFilterIn] = useState(false);
  const [newValue, setValue] = useState('');
  const [newFilter, setFilter] = useState('');

  function openFilterInput(type, item) {
    setFilterIn(true);
    setFilter(item);
  };

  function createChip() {
    if (newValue !== '' && newFilter !== ''){
      props.dispatch(addPayloadsFilter(newFilter, newValue));
      setFilterIn(false);
      setFilter('');
      setValue('');
      props.dispatch([
        removePayloadsPage(),
        setPayloadsPage(1)
      ]);
    }
  };

  function closeChip(id) {
    for(var i = 0; i < props.filters.length; i++) {
      if(props.filters[i].id === id){
        if(props.filters[i].type === 'date_gte') {
          props.dispatch(removeStartDate())
        } else if (props.filters[i].type === 'date_lte') {
          props.dispatch(removeEndDate())
        }
        props.dispatch([
          removePayloadsFilter(id),
          removePayloadsPage(),
          setPayloadsPage(1)
        ]);
      }
    }
  };

  return (
    <div style={{margin: '10px'}}>
      <DropdownContainer
        items={ FILTER_TYPES }
        type="Add Filter"
        setSelected={openFilterInput}
      />
      <TextInput
        isRequired
        id='newValue'
        type='text'
        name='newValue'
        onChange={(newValue) => setValue(newValue)}
        style={isFilterInOpen ? {
          width: '150px',
          marginLeft: '10px',
          marginRight: '10px'
        } : { display: 'none' }}
        placeholder={newFilter + '...'}
        value={newValue}
      />
      
      <Button
        variant='secondary'
        style={isFilterInOpen ? {} : { display: 'none' }} 
        onClick={(e) => {createChip()}}>
        Enter
      </Button>

      <ChipContainer 
        filters={props.filters}
        closeChip={closeChip}
      />

    </div>
  );
};