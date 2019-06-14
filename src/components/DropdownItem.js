import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DropdownItem extends Component {

    state = {
        isClicked: false,
        hover: false,
    }

    createRow() {
        return (
            <td 
                style={tdStyle}
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover}
                onClick={this.onClick}
            > 
            {this.props.item} 
            </td>
        )
    }

    onClick = (e) => {
        if(this.state.isClicked) {
            this.setState({
                bgColor: '#FFFFFF',
                isClicked: false,
            })
        } else {
            this.setState({
                bgColor: '#F0E68C',
                isClicked: true,
            })
        }
        this.props.onClick(this.props.item)
    }

    toggleHover = (e) => {
        this.setState({hover: !this.state.hover})
    }

    render() {
        {
            if(this.state.hover) {
                tdStyle = {
                    background: '#d3d3d3',
                    borderLeft: '1px solid #ccc',
                    borderRight: '1px solid #ccc',
                    borderBottom: '1px solid #ccc',
                    width: '135px'
                }
        }   else {
                tdStyle = {
                    background: '#ffffff',
                    borderLeft: '1px solid #ccc',
                    borderRight: '1px solid #ccc',
                    borderBottom: '1px solid #ccc',
                    width: '135px'
                }
            }
        }
        return (
            <tr style={trStyle} align='center'> 
                {this.createRow()} 
            </tr>
        )
    }
}

DropdownItem.propTypes = {
    item: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

const trStyle = {
    width: '100px',
}

var tdStyle = {}

export default DropdownItem;