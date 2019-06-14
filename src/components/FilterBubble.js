import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FilterBubble extends Component {

    state = {}

    closeBubble = () => {
        this.props.closeBubble(this.state.id)
    }

    render() {
        if(!('id' in this.state)){
            this.setState({
                id: this.props.id
            })
        }
        return (
            <div style={divStyle}> 
                <div style={{float:'left'}}>
                    <button style={buttonStyle} onClick={this.closeBubble}></button>
                </div>
                <div align='center' style={{fontSize:'calc(1vw)'}}>
                    {this.props.filter + '=' +  this.props.value} 
                </div>
            </div>
        )
    }
}

FilterBubble.propTypes = {
    filter: PropTypes.string.isRequired,
    closeBubble: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
}

const divStyle = {
    float: 'right',
    width: '140px',
    height: '20px',
    background: '#a9a9a9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
}

const buttonStyle = {
    width: '15px',
    height: '15px',
    background: 'red',
    borderRadius: 10,
}

export default FilterBubble;