import React from 'react';
import TrackGraphic from './TrackGraphic';
import { Accordion } from '@patternfly/react-core';

function generateUniqueServices(payloads) {
    var servicesSet = new Set()
    payloads.map(payload => {
        servicesSet.add(payload.service)
    });
    return (Array.from(servicesSet));
}

function getStatusesByService(payloads, services) {
    var servicesToStatuses = {}
    services.map(service => {
        servicesToStatuses[service] = []
        payloads.map(payload => {
            if (payload.service === service) {
                servicesToStatuses[service].push(payload.status)
            }
        })
    })
    return (servicesToStatuses);
}

function getMessagesFromService(payloads, services) {
    var servicesToMessages = {}
    services.map(service => {
        servicesToMessages[service] = []
        payloads.map(payload => {
            if (payload.service === service) {
                servicesToMessages[service].push({
                    'message': payload.status_msg,
                    'status': payload.status,
                    'date': payload.date
                })
            }
        })
    })
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
    var services = generateUniqueServices(props.payloads)
    var statuses = getStatusesByService(props.payloads, services)
    var messages = getMessagesFromService(props.payloads, services)
    return (
        <Accordion>
            <TrackGraphicContainer
                services={services} 
                statuses={statuses}
                messages={messages}
            />
        </Accordion>
    )
};