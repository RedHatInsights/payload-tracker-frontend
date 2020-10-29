import {
    AccordionContent,
    AccordionItem,
    AccordionToggle,
    ClipboardCopy,
    ClipboardCopyVariant,
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
import { getLocalDate } from '../../utilities/Common';

const TrackGraphic = ({ service, source, statuses, messages }) => {

    const [isOpen, toggleOpen] = useState(false);
    const [rows, setRows] = useState([]);
    const [cells, setCells] = useState([]);

    const truncateString = (string, chars) => string.length > chars ? string.substring(0, chars) + '...' : string;

    const generateRows = useCallback((messages) => {
        return messages.flatMap((message, index) => {
            message.status === 'error' && toggleOpen(true);
            return [
                {
                    cells: [
                        {
                            title: message.status
                        },
                        {
                            title: message.message ? truncateString(message.message, 80) : '',
                            props: { isOpen: message.message?.length > 0, ariaControls: 'compound-expansion-table-1' }
                        },
                        {
                            title: getLocalDate(
                                DateTime.fromFormat(
                                    message.date, 'yyyy-MM-dd H:mm:ss.uZZ'
                                ).toJSDate()
                            )
                        }
                    ]
                },
                {
                    parent: index * 2,
                    compoundParent: 1,
                    cells: [
                        {
                            title: <ClipboardCopy isCode isReadOnly isExpanded variant={ClipboardCopyVariant.expansion}>
                                {message.message}
                            </ClipboardCopy>,
                            props: { colSpan: 6, className: 'pf-m-no-padding' }
                        }
                    ]
                }
            ];
        });
    }, []);

    const onExpand = (e, rowIndex, colIndex) => {
        if (rows[rowIndex].cells[colIndex].title !== '') {
            rows[rowIndex].cells[colIndex].props.isOpen ?
                rows[rowIndex].cells[colIndex].props.isOpen = false :
                rows[rowIndex].cells[colIndex].props.isOpen = true;
            setRows([...rows]);
        }
    };

    useEffect(() => {
        messages && setRows(generateRows(messages));
        setCells([
            'status',
            {
                title: 'message',
                cellTransforms: [compoundExpand]
            },
            'date'
        ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);

    return <React.Fragment>
        {service && statuses && <AccordionItem>
            <AccordionToggle
                id={`${service}:${source}`}
                onClick={ () => toggleOpen(!isOpen)}
                isExpanded={isOpen}
            >
                <Progress
                    value={statuses.includes('success') ? 100 :
                        statuses.includes('processing') ? 50 : 25}
                    title={ source !== 'undefined' ? `${service} from ${source}` : service}
                    measureLocation={ProgressMeasureLocation.none}
                    variant={
                        statuses.includes('success') ? ProgressVariant.success :
                            statuses.includes('error') ? ProgressVariant.danger : ProgressVariant.info}
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
        </AccordionItem>}
    </React.Fragment>;
};

TrackGraphic.propTypes = {
    service: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    statuses: PropTypes.array.isRequired,
    messages: PropTypes.array.isRequired
};

export default TrackGraphic;
