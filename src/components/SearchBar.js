import * as AppActions from '../actions';

import { Button, Chip, TextInput } from '@patternfly/react-core';
import React, { useState } from 'react';

import DropdownContainer from './DropdownContainer';
import { FILTER_TYPES } from '../AppConstants';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SearchBar = ({ filters, removeStartDate, removeEndDate, addPayloadsFilter, closeFilterChip, createFilterChip }) => {

  const [isFilterInOpen, setFilterIn] = useState(false);
  const [newValue, setValue] = useState('');
  const [newFilter, setFilter] = useState('');

  function openFilterInput(type, item) {
    setFilterIn(true);
    setFilter(item);
  };

  const createChip = () => {
    if (newValue !== '' && newFilter !== ''){
      addPayloadsFilter(newFilter, newValue);
      setFilterIn(false);
      setFilter('');
      setValue('');
      createFilterChip();
    };
  };

  const closeChip = (id) => {
    for(var i = 0; i < filters.length; i++) {
      if (filters[i].id === id) {
        if (filters[i].type === 'date_gte') {
          removeStartDate();
        } else if (filters[i].type === 'date_lte') {
          removeEndDate();
        };
        closeFilterChip(id);
      };
    };
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

      <div style={{float:'right'}}>
        {filters.map(chip =>
          <Chip key={chip.id} onClick={() => closeChip(chip.id)}>
            {chip.type + '=' + chip.value}
          </Chip>
        )}
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  filters: PropTypes.array,
  removeStartDate: PropTypes.func,
  removeEndDate: PropTypes.func,
  addPayloadsFilter: PropTypes.func,
  closeFilterChip: PropTypes.func,
  createFilterChip: PropTypes.func
};

const mapStateToProps = state => ({
  filters: state.payloads.filters
});

const mapDispatchToProps = dispatch => ({
  removeStartDate: () => dispatch(AppActions.removeStartDate),
  removeEndDate: () => dispatch(AppActions.removeEndDate),
  addPayloadsFilter: (filter, value) => dispatch(AppActions.addPayloadsFilter(filter, value)),
  closeFilterChip: (id) => dispatch([
    AppActions.removePayloadsFilter(id),
    AppActions.removePayloadsPage(),
    AppActions.setPayloadsPage(1)
  ]),
  createFilterChip: () => dispatch([
    AppActions.removePayloadsPage(),
    AppActions.setPayloadsPage(1)
  ])
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);