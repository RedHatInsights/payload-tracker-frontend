import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropdownContainer from './DropdownContainer';
import { Chip, Button, TextInput } from '@patternfly/react-core';

const ChipContainer = props => {
  return(
    <div style={{float:'right'}}>
      {props.filters.map(chip =>
        <React.Fragment>
          <Chip key={chip.id} onClick={() => props.closeChip(chip.id)}>
            {chip.key + '=' + chip.value}
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
      filterCount: 0,
      filterInputOpen: false,
      newValue: '',
      isOpen: false,
    }
  }

  setSelected = (filterType, filterValue) => {
    this.props.updateParameters({name: filterType, value: filterValue})
    this.props.buildQuery()
  }

  openFilterInput = (type, item) => {
    this.setState({
      filterInputOpen: true,
      newFilter: item,
    })
  }

  createChip = () => {
    var {filterCount, newFilter, newValue} = this.state
    if (newValue !== '' && newFilter !== ''){
      this.props.filters.push({id: filterCount, key: newFilter, value: newValue})
      this.setState({
        filterCount: this.state.filterCount + 1,
        filterInputOpen: false,
        newFilter: '',
        newValue: '',
      })
      this.props.updateParameters({name: 'page', value: 1})
      this.props.buildQuery()
    }
  }

  closeChip = (id) => {
    for(var i = 0; i < this.props.filters.length; i++) {
      if(this.props.filters[i].id === id){
          this.props.filters.splice(i,1)
      }
    }
    this.props.buildQuery()
  }

  handleNewValueInputChange = newValue =>{
    this.setState({
        newValue
    })
  }

  render() {
  return (
    <div style={{margin: '10px'}}>
      <DropdownContainer 
        items={['service', 'source', 'account', 'payload_id',
        'inventory_id', 'system_id', 'status',
        'status_msg', 'date', 'created_at']}
        type="Sort By"
        setSelected={this.setSelected}
      />

      <DropdownContainer 
        items={['asc', 'desc']}
        type="Sort Dir"
        setSelected={this.setSelected}
      />

      <DropdownContainer
        items={[
          'service', 'source', 'account', 'inventory_id', 
          'system_id', 'status', 'status_msg', 'date_lt', 
          'date_gt', 'date_lte', 'date_gte', 'created_at_lt',
          'created_at_gt', 'created_at_lte', 'created_at_gte']}
        type="Filter By"
        setSelected={this.openFilterInput}
      />

      <TextInput
        isRequired
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

SearchBar.propTypes = {
  buildQuery: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
  updateParameters: PropTypes.func.isRequired,
}

export default SearchBar;
