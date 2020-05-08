import { Accordion } from '@patternfly/react-core';
import PropTypes from 'prop-types';
import React from 'react';
import TrackGraphic from './TrackGraphic';
import { connect } from 'react-redux';

function generateUniqueServices(payloads) {
    var servicesSet = new Set()
    payloads.map(payload => 
        servicesSet.add(payload.service)
    );
    return (Array.from(servicesSet));
}

function getStatusesByService(payloads, services) {
    var servicesToStatuses = {}
    for (var i = 0; i < services.length; i++) {
        var service = services[i];
        servicesToStatuses[service] = []
        for (var j = 0; j < payloads.length; j++) {
            var payload = payloads[j];
            if (payload.service === service) {
                servicesToStatuses[service].push(payload.status)
            }
        }
    }
    return (servicesToStatuses);
}

function getMessagesFromService(payloads, services) {
    var servicesToMessages = {}
    for (var i = 0; i < services.length; i++) {
        var service = services[i];
        servicesToMessages[service] = []
        for (var j = 0; j < payloads.length; j++) {
            var payload = payloads[j];
            if (payload.service === service) {
                servicesToMessages[service].push({
                    'message': payload.status_msg,
                    'status': payload.status,
                    'date': payload.date
                })
            }
        }
    }
    return (servicesToMessages);
}

const TrackGraphicView = ({ payloads }) => {

    var services = (payloads && generateUniqueServices(payloads)) || [];
    var statuses = (payloads && getStatusesByService(payloads, services)) || [];
    var messages = (payloads && getMessagesFromService(payloads, services)) || [];

    return <Accordion>
        <React.Fragment>
        {services.map(service =>
            <div style={{padding: '10px'}}>
                <TrackGraphic
                    service={service}
                    statuses={statuses[service]}
                    messages={messages[service]}
                />
            </div>)}
        </React.Fragment>
    </Accordion>
};

TrackGraphicView.propTypes = {
    payloads: PropTypes.array
};

const mapStateToProps = state => ({
    payloads: state.data.payloads
});

export default connect(mapStateToProps, null)(TrackGraphicView);