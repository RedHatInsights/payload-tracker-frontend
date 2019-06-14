import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AgReactGrid from 'ag-grid-react'
import { tsDeclareFunction } from '@babel/types';

class Payload extends Component{

    createRow() {
        var row = []
        const {payload} = this.props;

        for (var key in payload){
            row.push(<td style={tdStyle}> {payload[key]} </td>)
        }

        return row;

    }

    render() {
        return (
            <tr style={trStyle}> {this.createRow()} </tr>
        )
    }
}

Payload.propTypes = {
    payload: PropTypes.object.isRequired,
}

const trStyle = {
    background: '#f4f4f4',
}

const tdStyle = {
    borderLeft: '1px solid #ccc',
    borderRight: '1px solid #ccc',
    width: "10%",
}

export default Payload;