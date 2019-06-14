import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Payload from './Payload.js';

class Payloads extends Component{

    createTableHeader(){
        var header = []
        const columnDef = {id : "id", Service: "service", Source: "source",
                Account: "account", Payload_id: "payload_id",
                Inventory_id: "inventory_id", System_id: "system_id",
                Status: "status", Status_msg: "status_msg", Date: "date",
                Created_at: "created_at"}
        for (var key in columnDef) {
            header.push(<td style={tdStyle}> {columnDef[key]} </td>);
        }
        return (header);
    }

    render() {
        return (
            <table style={tableStyle}>
                <tr> {this.createTableHeader()} </tr>
                {this.props.payloads.map(item =>
                    <Payload payload={item}/>
                )}
            </table>
        )
    }
}

Payloads.propTypes = {
    payloads: PropTypes.array.isRequired,
}

const tableStyle = {
    tableLayout: "fixed",
    width: "100%",
    padding: '5px',
}

const tdStyle = {
    borderLeft: '1px solid #ccc',
    borderRight: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    borderTop: '1px solid #ccc',
    width: "100px",
}

export default Payloads;