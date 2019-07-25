import React, { Component } from 'react';
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

class SearchBar extends Component {

  constructor(){
    super()
    this.state = {
      filterInputOpen: false,
      newValue: '',
      isOpen: false,
    }
  }

  openFilterInput = (type, item) => {
    this.setState({
      filterInputOpen: true,
      newFilter: item,
    })
  }

  createChip = () => {
    var {newFilter, newValue} = this.state
    if (newValue !== '' && newFilter !== ''){
      this.props.dispatch(addPayloadsFilter(newFilter, newValue));
      this.setState({
        filterInputOpen: false,
        newFilter: '',
        newValue: '',
      })
      this.props.dispatch([
        removePayloadsPage(),
        setPayloadsPage(1)
      ]);
    }
  }

  closeChip = (id) => {
    for(var i = 0; i < this.props.filters.length; i++) {
      if(this.props.filters[i].id === id){
        if(this.props.filters[i].type === 'date_gte') {
          this.props.dispatch(removeStartDate())
        } else if (this.props.filters[i].type === 'date_lte') {
          this.props.dispatch(removeEndDate())
        }
        this.props.dispatch([
          removePayloadsFilter(id),
          removePayloadsPage(),
          setPayloadsPage(1)
        ])
      }
    }
  }

  handleNewValueInputChange = newValue => {
    this.setState({
        newValue
    })
  }

  render() {
  return (
    <div style={{margin: '10px'}}>

      <DropdownContainer
        items={ FILTER_TYPES }
        type="Add Filter"
        setSelected={this.openFilterInput}
      />

      <TextInput
        isRequired
        id='newValue'
        type='text'
        name='newValue'
        onChange={this.handleNewValueInputChange}
        style={this.state.filterInputOpen ? {
          width: '150px',
          marginLeft: '10px',
          marginRight: '10px'
        } : { display: 'none' }}
        placeholder={this.state.newFilter + '...'}
        value={this.state.newValue}
      />
      
      <Button
        variant='secondary'
        style={this.state.filterInputOpen ? {} : { display: 'none' }} 
        onClick={(e) => {this.createChip()}}>
        Enter
      </Button>

      <ChipContainer 
        filters={this.props.filters}
        closeChip={this.closeChip}
      />

    </div>
  );
  }

}

export default SearchBar;
