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
import React, { useEffect, useState } from 'react';
import {
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from '@patternfly/react-table';
import { getLocalDate, truncateString } from '../../utilities/Common';

import DateTime from 'luxon/src/datetime';
import PropTypes from 'prop-types';
import KibanaLink from './KibanaLink';

const TrackGraphic = ({ service, source, statuses, messages, requestId }) => {

    const [isOpen, toggleOpen] = useState(false);
    const [expandedMessages, setExpandedMessages] = useState(new Set());

    const toggleMessageExpansion = (messageIndex) => {
        setExpandedMessages(prev => {
            const newSet = new Set(prev);
            if (newSet.has(messageIndex)) {
                newSet.delete(messageIndex);
            } else {
                newSet.add(messageIndex);
            }

            return newSet;
        });
    };

    useEffect(() => {
        if (messages) {
            const errorIndices = new Set();
            messages.forEach((message, index) => {
                if (message.status === 'error') {
                    errorIndices.add(index);
                    toggleOpen(true);
                }
            });
            setExpandedMessages(errorIndices);
        }
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
                <KibanaLink requestId={requestId || ''} serviceName={service}> Filter In Kibana </KibanaLink>
                <Table variant='compact'>
                    <Thead>
                        <Tr>
                            <Th>status</Th>
                            <Th>message</Th>
                            <Th>date</Th>
                        </Tr>
                    </Thead>
                    {messages && messages.map((message, messageIndex) => {
                        const isExpanded = expandedMessages.has(messageIndex);
                        return (
                            <Tbody key={messageIndex} isExpanded={isExpanded}>
                                <Tr>
                                    <Td>{message.status}</Td>
                                    <Td
                                        compoundExpand={{
                                            isExpanded,
                                            onToggle: () => toggleMessageExpansion(messageIndex),
                                            expandId: `expandable-message-${messageIndex}`
                                        }}
                                    >
                                        {message.message ? truncateString(message.message, 80) : ''}
                                    </Td>
                                    <Td>
                                        {getLocalDate(
                                            DateTime.fromISO(message.date).toJSDate()
                                        )}
                                    </Td>
                                </Tr>
                                <Tr isExpanded={isExpanded}>
                                    <Td colSpan={3} className='pf-v6-m-no-padding'>
                                        <ClipboardCopy isReadOnly isExpanded variant={ClipboardCopyVariant.expansion}>
                                            {message.message}
                                        </ClipboardCopy>
                                    </Td>
                                </Tr>
                            </Tbody>
                        );
                    })}
                </Table>
            </AccordionContent>
        </AccordionItem>}
    </React.Fragment>;
};

TrackGraphic.propTypes = {
    service: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    statuses: PropTypes.array.isRequired,
    messages: PropTypes.array.isRequired,
    requestId: PropTypes.string
};

export default TrackGraphic;
