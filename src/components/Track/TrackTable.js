import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableHeader, TableVariant } from '@patternfly/react-table';

import DateTime from 'luxon/src/datetime';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLocalDate } from '../../AppConstants';

const TrackTable = ({ payloads, cells }) => {

    const [rows, setRows] = useState([]);
    const [cols, setCols] = useState([]);

    const truncate = (value) => value.length > 12 ? `${value.substring(0, 12)}...` : value;

    const generateCells = (cells) => cells.filter(cell => cell.isActive);

    const generateRows = (payloads, cells) => {
        return payloads.map(payload => {
            return cells.map(cell => {
                const value = payload?.[cell.title];
                if (value) {
                    if (cell.isDate) {
                        return {
                            title: getLocalDate(
                                DateTime.fromFormat(
                                    value, 'yyyy-MM-dd H:mm:ss.uZZ'
                                ).toJSDate()
                            )
                        };
                    } else {
                        return { title: truncate(value) };
                    }
                } else {
                    return {};
                }
            });
        });
    };

    useEffect(() => {
        setRows(generateRows(payloads, cells));
        setCols(generateCells(cells));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [payloads, cells]);

    return <Table
        cells={cols}
        rows={rows}
        variant={TableVariant.compact}
    >
        <TableHeader/>
        <TableBody/>
    </Table>;
};

TrackTable.propTypes = {
    payloads: PropTypes.array,
    cells: PropTypes.array
};

const mapStateToProps = state => ({
    payloads: state.data.payloads,
    cells: state.cell.cells
});

export default connect(mapStateToProps, null)(TrackTable);
