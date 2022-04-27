import {
    Bullseye,
    EmptyState,
    EmptyStateBody,
    EmptyStateIcon,
    Spinner,
    Title
} from '@patternfly/react-core';
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableVariant
} from '@patternfly/react-table';

import DateTime from 'luxon/src/datetime';
import HoverableAttribute from './HoverableAttribute';
import PropTypes from 'prop-types';
import { SearchIcon } from '@patternfly/react-icons';
import { connect } from 'react-redux';
import { getLocalDate } from '../utilities/Common';

const PayloadsTable = ({ payloads, cells, loading, sortDir, setSortDir, sortBy, setSortBy }) => {

    const [formattedRows, setFormattedRows] = useState();
    const [formattedCells, setFormattedCells] = useState();

    const generateCells = (cells) => cells.filter(cell => cell.isActive);

    const generateRows = (payloads, cells) => {
        return payloads.map(payload => {
            return cells.map(cell => {
                const value = payload?.[cell.title];
                if (value) {
                    if (cell.isFilterable) {
                        return {
                            title: <HoverableAttribute
                                type='filter'
                                value={value}
                                filter={cell.title}
                            />,
                            props: {
                                component: 'th'
                            }
                        };
                    } else if (cell.isTrackable) {
                        return {
                            title: <HoverableAttribute
                                type='track'
                                value={value}
                                filter={cell.title}
                            />,
                            props: {
                                component: 'th'
                            }
                        };
                    } else if (cell.isDate) {
                        return {
                            title: getLocalDate(
                                DateTime.fromISO(
                                    value
                                ).toJSDate()
                            )
                        };
                    } else {
                        return { title: value };
                    }
                } else {
                    return {};
                }
            });
        });
    };

    useEffect(() => {
        const cols = generateCells(cells);
        setFormattedCells(cols);
        setFormattedRows(generateRows(payloads, cols));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cells, payloads]);

    const onSort = (_event, index, direction) => {
        setSortDir(direction);
        setSortBy(index);
    };

    return <div>
        {loading && <Bullseye><Spinner size='xl'/></Bullseye>}
        {!loading && formattedCells && formattedRows && <Table
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
        {!loading && formattedCells && formattedRows && (!payloads || payloads.length) && <Bullseye>
            <EmptyState>
                <EmptyStateIcon icon={SearchIcon}/>
                <Title headingLevel="h4" size="lg">
                    No results found
                </Title>
                <EmptyStateBody>
                    No results match the filter criteria. Clear filters to show results.
                </EmptyStateBody>
            </EmptyState>
        </Bullseye>}
    </div>;
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
