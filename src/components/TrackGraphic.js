import {
    AccordionContent,
    AccordionItem,
    AccordionToggle,
    Progress,
    ProgressMeasureLocation,
    ProgressVariant
} from '@patternfly/react-core';
import React, { useCallback, useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableVariant,
    compoundExpand
} from '@patternfly/react-table';

import DateTime from 'luxon/src/datetime';
import PropTypes from 'prop-types';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { getLocalDate } from '../AppConstants';

const TrackGraphic = ({ service, statuses, messages }) => {

    const [isOpen, toggleOpen] = useState(false);
    const [rows, setRows] = useState([]);
    const [cells, setCells] = useState([]);

    const truncateString = (string, chars) => string.length > chars ? string.substring(0, chars) + '...' : string;

    const generateTableRows = useCallback((messages) => {
        var rows = [];
        var parentIndex = 0;
        for (var i = 0; i < messages.length; i++) {
            var message = messages[i];
            var row = {
                cells: [
                    {
                        title: message.status
                    },
                    {
                        title: message.message ? truncateString(message.message, 80) : '',
                        props: {isOpen: false, ariaControls : 'compound-expansion-table-1'}
                    },
                    {
                        title: getLocalDate(
                            DateTime.fromFormat(
                                message.date, 'yyyy-MM-dd H:mm:ss.uZZ'
                            ).toJSDate()
                        )
                    }
                ]
            }
            rows.push(row)
            var expandablerow = {
                parent: parentIndex,
                compoundParent: 1,
                cells: [
                    {
                        title: <SyntaxHighlighter language='python'>
                            {message.message}
                        </SyntaxHighlighter>,
                        props: {colSpan: 6, className: 'pf-m-no-padding'}
                    }
                ]
            }
            rows.push(expandablerow)
            parentIndex += 2;
        };
        return (rows);
    }, []);

    const onExpand = (e, rowIndex, colIndex) => {
        if (rows[rowIndex].cells[colIndex].title !== '') {
            rows[rowIndex].cells[colIndex].props.isOpen ?
                rows[rowIndex].cells[colIndex].props.isOpen = false :
                rows[rowIndex].cells[colIndex].props.isOpen = true
            setRows([...rows]);
        };
    };

    useEffect(() => {
        setRows(generateTableRows(messages));
        setCells([
            'status',
            {
                title: 'message',
                cellTransforms: [compoundExpand]
            },
            'date'
        ]);
    }, [messages, generateTableRows]);

    return (
        <AccordionItem>
            <AccordionToggle
                id={service}
                onClick={ () => toggleOpen(!isOpen)}
                isExpanded={isOpen}
            >
                <Progress
                    value={
                        (statuses.includes('success') ||
                        statuses.includes('202') ||
                        statuses.includes('error') ||
                        statuses.includes('failure') ||
                        statuses.includes('announced')) ?
                        100 : (
                            statuses.includes('processing') ?
                            50:
                            25
                        )
                    }
                    title={service}
                    measureLocation={ProgressMeasureLocation.none}
                    variant={
                        (statuses.includes('success') ||
                        statuses.includes('202') ||
                        statuses.includes('announced')) ?
                        ProgressVariant.success : (
                            (statuses.includes('error') ||
                            statuses.includes('failure')) ?
                            ProgressVariant.danger :
                            ProgressVariant.info
                        )
                    }
                />
            </AccordionToggle>
            <AccordionContent isHidden={!isOpen}>
                <Table
                    onExpand={onExpand}
                    cells={cells}
                    rows={rows}
                    variant={TableVariant.compact}
                >
                    <TableHeader/>
                    <TableBody/>
                </Table>
            </AccordionContent>
        </AccordionItem>
    );
};

TrackGraphic.propTypes = {
    service: PropTypes.string.isRequired,
    statuses: PropTypes.array.isRequired,
    messages: PropTypes.array.isRequired
};

export default TrackGraphic;