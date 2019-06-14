import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropdownItem from './DropdownItem';

class Dropdown extends Component {

    constructor() {
        super()
        this.state = {
            menuOpen: false,
            header: '',
            isLoaded: false,
            type: '',
        }
    }

    onClick = (item) => {
        if (item !== this.state.header){
            this.setState({
                header: item
            })
            this.props.setSelected(this.state.type, item)
        }
    }

    changeMenuState = (e) => {
        if (this.state.menuOpen) {
            this.setState({
                menuOpen: false
            })
        } else {
            this.setState({
                menuOpen: true
            })
        }
    }

    setHeader = (value) => {
        this.setState({
            header: value,
            isLoaded: true,
            type: value
        })
    }

    render() {
        if(!this.state.isLoaded) {
            this.setHeader(this.props.header)
        }
    return (
        <div style={{width:'140px', float: 'left'}}>
            <button onClick={this.changeMenuState} style={btnStyle}> {this.state.header} </button> 
            <div>
                <table cellSpacing="0" style={this.state.menuOpen ? {} : { display: 'none' }}>
                    {this.props.items.map(item => 
                        <DropdownItem item={item} onClick={this.onClick}/>
                    )}
                </table>
            </div>
        </div>
    )}
}

const btnStyle ={ 
    width: '140px',
    height: '20px',
    background: '#a9a9a9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
}

Dropdown.propTypes = {
    header: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    setSelected: PropTypes.array.isRequired,
}

export default Dropdown;