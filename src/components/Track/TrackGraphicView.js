import React, { useEffect, useState } from 'react';

import { Accordion } from '@patternfly/react-core';
import PropTypes from 'prop-types';
import TrackGraphic from './TrackGraphic';
import { connect } from 'react-redux';

const TrackGraphicView = ({ payloads }) => {

    const [services, setServices] = useState();
    const [statuses, setStatuses] = useState();
    const [messages, setMessages] = useState();

    const generateUniqueServices = (payloads) => Array.from(new Set(payloads.map(p => p.service)));

    const getStatusesByService = (payloads, services) => {
        return services.reduce((obj, s) => {
            return { ...obj, [s]: payloads.filter(p => p.service === s).map(p => p.status) };
        }, {});
    };

    const getMessagesFromService = (payloads, services) => {
        return services.reduce((obj, s) => {
            return { ...obj, [s]: payloads.filter(p => p.service === s).map(p => ({
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
        {messages && statuses && services.map((service, index) =>
            <div key={index}>
                <TrackGraphic
                    service={service}
                    statuses={statuses[service]}
                    messages={messages[service]}
                />
            </div>
        )}
    </Accordion>;
};

TrackGraphicView.propTypes = {
    payloads: PropTypes.array
};

const mapStateToProps = state => ({
    payloads: state.data.payloads
});

export default connect(mapStateToProps, null)(TrackGraphicView);
