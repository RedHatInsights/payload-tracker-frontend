import React, { Component } from 'react';
import { Button, TextInput } from '@patternfly/react-core';
import DropdownContainer from './DropdownContainer';

class TrackSearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            payload_id: '',
        }
    }

    setSelected = (filterType, filterValue) => {
        this.props.updateParameters({name: filterType, value: filterValue})
        this.props.buildQuery()
    }

    handlePayloadIDInputChange = payload_id => {
        this.setState({
            payload_id
        })
    }

    submitQuery = () => {
        if (this.state.payload_id !== ''){
          this.props.updateParameters({name: 'payload_id', value: this.state.payload_id})
          this.props.buildQuery()
        }
    }

    render() {
        return (
            <div>
                <TextInput
                    isRequired
                    id='payload_id'
                    type="text"
                    name="payload_id"
                    value={this.state.payload_id}
                    onChange={this.handlePayloadIDInputChange}
                    style={inputStyle}
                    placeholder='Enter Payload ID...'
                />
                <Button variant='primary' onClick={(e) => {this.submitQuery()}}> 
                        Submit
                </Button>
                <DropdownContainer 
                    items={['service', 'source', 'status', 'status_msg', 'date']}
                    type="Sort By"
                    setSelected={this.setSelected}
                />
                <DropdownContainer 
                    items={['asc', 'desc']}
                    type="Sort Dir"
                    setSelected={this.setSelected}
                />
            </div>
        )
    }
};

const inputStyle = {
    width: '90%',
    marginBottom: '10px',
    marginRight: '10px',
    boxSizing: 'border-box',
}

export default TrackSearchBar;