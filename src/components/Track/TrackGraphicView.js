import React, { useEffect, useState } from 'react';

import { Accordion } from '@patternfly/react-core';
import PropTypes from 'prop-types';
import TrackGraphic from './TrackGraphic';

const TrackGraphicView = ({ payloads }) => {

    const [services, setServices] = useState();
    const [statuses, setStatuses] = useState();
    const [messages, setMessages] = useState();

    const generateUniqueServices = (payloads) => Array.from(new Set(payloads.map(p => `${p.service}:${p?.source}`)));

    const getStatusesByService = (payloads, services) => {
        return services.reduce((obj, s) => {
            const [service, source] = s.split(':');
            return { ...obj, [s]: payloads.filter(
                p => p.service === service && (p?.source || 'undefined') === source
            ).map(p => p.status) };
        }, {});
    };

    const getMessagesFromService = (payloads, services) => {
        return services.reduce((obj, s) => {
            const [service, source] = s.split(':');
            return { ...obj, [s]: payloads.filter(
                p => p.service === service && (p?.source || 'undefined') === source
            ).map(p => ({
                message: p.status_msg,
                status: p.status,
                date: p.date
            })) };
        }, {});
    };

    useEffect(() => {
        if (services) {
            setStatuses(getStatusesByService(payloads, services));
            setMessages(getMessagesFromService(payloads, services));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [services]);

    useEffect(() => {
        setServices(generateUniqueServices(payloads));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [payloads]);

    return <Accordion>
        {messages && statuses && services.map((key, index) => {
            const [service, source] = key.split(':');
            return <div key={index}>
                <TrackGraphic
                    service={service}
                    source={source}
                    statuses={statuses[key]}
                    messages={messages[key]}
                />
            </div>;
        })}
    </Accordion>;
};

TrackGraphicView.propTypes = {
    payloads: PropTypes.array.isRequired
};

export default TrackGraphicView;
