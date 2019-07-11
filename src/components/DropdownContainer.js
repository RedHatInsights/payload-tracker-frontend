import React, { Component } from 'react';
import { 
    Dropdown,
    DropdownToggle, 
    DropdownItem, 
} from '@patternfly/react-core';
import PropTypes from 'prop-types';

class DropdownContainer extends Component {

    constructor(){
        super()
        this.state = {
            isOpen: false,
        };
        this.onToggle = isOpen => {
            this.setState({
              isOpen
            });
        };
        this.onSelect = event => {
            this.setState({
              isOpen: !this.state.isOpen,
            });
        };
        this.dropdownItems = []
    }

    componentWillMount = () => {
        this.generateItems(this.props.items)
    }

    setSelected = (item) => {
        this.props.setSelected(this.props.type, item);
    }

    generateItems = (items) => {
        items.map(item => {
            this.dropdownItems.push(
                <DropdownItem
                    key={item}
                    component='button'
                    onClick={e => this.setSelected(item)}
                > {item} </DropdownItem>
            )
        });
        this.setState({isInit: true});
    }

    render(){ 
        const { type } = this.props
        return (
            <Dropdown
                onSelect={this.onSelect}
                toggle={<DropdownToggle onToggle={this.onToggle}>{type}</DropdownToggle>}
                isOpen={this.state.isOpen}
                dropdownItems={this.dropdownItems}
            />
        )
    }

}

DropdownContainer.propTypes = {
    items: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    setSelected: PropTypes.func.isRequired,
}

export default DropdownContainer;