import React from 'react';
import TrackGraphic from './TrackGraphic';
import { Accordion } from '@patternfly/react-core';

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

const TrackGraphicContainer = props => {
    return props.services.map(service =>
        <div style={{padding: '10px'}}>
            <TrackGraphic 
                service={service} 
                statuses={props.statuses[service]}
                messages={props.messages[service]}
            />
        </div>
    )
}

export default props => {

    var statuses = getStatusesByService(props.payloads, props.services);
    var messages = getMessagesFromService(props.payloads, props.services);

    return (
        <Accordion>
            <TrackGraphicContainer
                services={props.services} 
                statuses={statuses}
                messages={messages}
            />
        </Accordion>
    )
};