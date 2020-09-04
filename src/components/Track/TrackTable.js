import { Table, TableBody, TableHeader, TableVariant } from '@patternfly/react-table';

import DateTime from 'luxon/src/datetime';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getLocalDate } from '../../AppConstants';

const truncate = (value) => <React.Fragment>
    {value.length > 12 ?
        `${value.substring(0, 12)}...` :
        value}
</React.Fragment>;

const generateRows = (payloads, cells) => {
    var rows = [];
    if (payloads) {
        Object.values(payloads).forEach(payload => {
            var row = [];
            Object.entries(cells).forEach(([cellKey, cellValue]) => {
                var valueWasFound = false;
                if (cellValue.isActive) {
                    Object.entries(payload).forEach(([payloadKey, payloadValue]) => {
                        if (cellValue.title === payloadKey) {
                            cellValue.isDate ?
                                row.push({
                                    title: getLocalDate(
                                        DateTime.fromFormat(
                                            payloadValue, 'yyyy-MM-dd H:mm:ss.uZZ'
                                        ).toJSDate()
                                    )
                                }) :
                                row.push({ title: truncate(payloadValue) } )
                            valueWasFound = true;
                        }
                    })
                    if(!valueWasFound){
                        row.push("")
                    }
                }
            })
            rows.push({ cells: row })
        })
    }
    return (rows);
}

const generateCells = (cells) => {
    var formattedCells = [];
    Object.entries(cells).forEach(([key, cell]) => {
        if (cell.isActive) {
            const { transforms, ...props } = cell;
            formattedCells.push(props);
        }
    })
    return(formattedCells)
}

const TrackTable = ({ payloads, cells }) => <React.Fragment>
    <Table
        cells={generateCells(cells)}
        rows={generateRows(payloads, cells)}
        variant={TableVariant.compact}
    >
        <TableHeader/>
        <TableBody/>
    </Table>
</React.Fragment>;

TrackTable.propTypes = {
    payloads: PropTypes.array,
    cells: PropTypes.object
};

const mapStateToProps = state => ({
    payloads: state.data.payloads,
    cells: state.cell.cells
});

export default connect(mapStateToProps, null)(TrackTable);