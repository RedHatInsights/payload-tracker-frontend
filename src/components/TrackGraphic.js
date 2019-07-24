import React, { useState } from 'react';
import { 
    Progress, ProgressMeasureLocation, ProgressVariant, Tooltip,
    AccordionItem, AccordionToggle, AccordionContent
} from '@patternfly/react-core';
import {
    Table, TableHeader, TableBody, TableVariant, compoundExpand
} from '@patternfly/react-table';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {CHECK_OBJECT_EQUIVALENCE} from '../AppConstants'


const default_cells = [
    'status',
    {
        title: 'message',
        cellTransforms: [compoundExpand]
    },
    'date'
]

function truncateString(string) {
    if (string.length > 80) {
        return string.substring(0,80) + '...'
    } else {
        return string
    }
}

function generateTableRows(messages) {
    var rows = []
    var parentIndex = 0
    messages.map(message => {
        var row = {
            cells: [
                {
                    title: message.status
                },
                {
                    title: truncateString(message.message),
                    props: {isOpen: false, ariaControls : 'compound-expansion-table-1'}
                },
                {
                    title: message.date
                }
            ]
        }
        rows.push(row)
        var expandablerow = {
            parent: parentIndex,
            compoundParent: 1,
            cells: [
                { 
                    title: (
                        <div style={{maxWidth:'100vw', overflow:'auto'}}>
                            <SyntaxHighlighter language='python'>
                                {message.message}
                            </SyntaxHighlighter>
                        </div>
                    ),
                    props: {colSpan: 6, className: 'pf-m-no-padding'}
                }
            ]
        }
        rows.push(expandablerow)
        parentIndex += 2;
    });
    return rows
};

export default props => {

    const [isOpen, toggleOpen] = useState(false);
    const [rows, setRows] = useState(generateTableRows(props.messages))
    const [cells, setCells] = useState(default_cells)

    var errorMessage = props.messages.filter(message => (
        message.status === 'error' ||
        message.status === 'failure'
    ))

    if (!CHECK_OBJECT_EQUIVALENCE(errorMessage, [])) {
        errorMessage = errorMessage[0].message
    } else {
        errorMessage = false
    }

    function onExpand(e, rowIndex, colIndex) {
        console.log(rowIndex, colIndex)
        rows[rowIndex].cells[colIndex].props.isOpen ?
            rows[rowIndex].cells[colIndex].props.isOpen = false :
            rows[rowIndex].cells[colIndex].props.isOpen = true
        setRows([...rows]);
    }

    return (
        <AccordionItem>
            <AccordionToggle
                id={props.service}
                onClick={ () => toggleOpen(!isOpen)}
                isExpanded={isOpen}
            >
                <Tooltip
                    position='bottom'
                    content={ errorMessage ? truncateString(errorMessage) : '' }
                    style={ errorMessage ? {} : {display: 'none'} }
                    entryDelay={0}
                >
                    <Progress
                        value={
                            (props.statuses.includes('success') ||
                            props.statuses.includes('202') || 
                            props.statuses.includes('error') ||
                            props.statuses.includes('failure')) ?
                            100 : (
                                props.statuses.includes('processing') ?
                                50:
                                25
                            )
                        }
                        title={props.service}
                        measureLocation={ProgressMeasureLocation.none}
                        variant={
                            (props.statuses.includes('success') || 
                            props.statuses.includes('202')) ?
                            ProgressVariant.success : (
                                (props.statuses.includes('error') ||
                                props.statuses.includes('failure')) ?
                                ProgressVariant.danger :
                                ProgressVariant.info
                            )
                        }
                    />
                </Tooltip>
            </AccordionToggle>
            <AccordionContent 
                isHidden={!isOpen}
            >
                <div style={{maxWidth:'100vw', overflow:'auto'}}>
                    <Table
                        onExpand={onExpand}
                        cells={cells}
                        rows={rows}
                        variant={TableVariant.compact}
                    >
                        <TableHeader/>
                        <TableBody/>
                    </Table>
                </div>
            </AccordionContent>
        </AccordionItem>
    )
};