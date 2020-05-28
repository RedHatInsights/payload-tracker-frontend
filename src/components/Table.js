import 'moment-timezone';

import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableVariant,
} from '@patternfly/react-table';

import HoverableAttribute from './HoverableAttribute'
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { Spinner } from '@patternfly/react-core';
import { connect } from 'react-redux';

Moment.globalTimezone = 'America/New_York';
Moment.globalFormat = 'LLLL z';

const generateRows = (payloads, cells) => {
    var rows = [];
    Object.values(payloads).map(payload => {
        var row = [];
        Object.entries(cells).map(([cellKey, cellValue]) => {
            var valueWasFound = false;
            if (cellValue.isActive) {
                Object.entries(payload).map(([payloadKey, payloadValue]) => {
                    if (cellValue.title === payloadKey) {
                        if (cellValue.isFilterable) {
                            row.push({
                                title: <HoverableAttribute
                                    type='filter'
                                    value={payloadValue}
                                    filter={payloadKey}
                                />,
                                props: { 
                                    component: 'th'
                            }})
                        } else if (cellValue.isTrackable) {
                            row.push({
                                title: <HoverableAttribute
                                    type='track'
                                    value={payloadValue}
                                />,
                                props: { 
                                    component: 'th'
                            }})
                        } else if (cellValue.isDate) {
                            row.push({
                                title: <Moment>
                                { `${payloadValue}-0000` }
                                </Moment> 
                            })
                        } else {
                            row.push({ title: payloadValue })
                        }
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
    return (rows);
};

const generateCells = (cells) => {
    var output = [];
    Object.entries(cells).forEach(([key, cell]) => {
        if (cell.isActive) {
            output.push(cell);
        }
    });
    return output;
};

const PayloadsTable = ({ payloads, cells, loading, sortDir, setSortDir, sortBy, setSortBy }) => {

    const [formattedRows, setFormattedRows] = useState(undefined);
    const [formattedCells, setFormattedCells] = useState(undefined);

    useEffect(() => {
        setFormattedRows(generateRows(payloads, cells));
        setFormattedCells(generateCells(cells));
    }, [cells, payloads]);
    
    const onSort = (_event, index, direction) => {
        setSortDir(direction);
        setSortBy(index)
    };

    return <React.Fragment>
        {loading && <span style={{ justifyContent: 'center', display: 'flex' }}>
            <Spinner size='xl'/>
        </span>}
        {!loading && <Table
                cells={formattedCells} 
                rows={formattedRows}
                variant={TableVariant.compact}
                sortBy={{
                    index: formattedCells.findIndex(x => x.title === sortBy),
                    direction: sortDir
                }}
                onSort={(e, index, direction) => onSort(e, formattedCells[index].title, direction)}
            >
                <TableHeader/>
                <TableBody/>
        </Table>}
    </React.Fragment>;
};

PayloadsTable.propTypes = {
    payloads: PropTypes.array,
    cells: PropTypes.array,
    sortDir: PropTypes.string,
    setSortDir: PropTypes.func,
    sortBy: PropTypes.string,
    setSortBy: PropTypes.func,
    loading: PropTypes.bool
};

const mapStateToProps = state => ({
    payloads: state.data.payloads,
    cells: state.cell.cells,
    loading: state.data.loading
});

export default connect(mapStateToProps, null)(PayloadsTable);