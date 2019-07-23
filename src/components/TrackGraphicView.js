import React from 'react';
import TrackGraphic from './TrackGraphic';

function generateUniqueServices(payloads) {
    var servicesSet = new Set()
    payloads.map(payload => {
        servicesSet.add(payload.service)
    });
    return (Array.from(servicesSet));
}

function getStatusesFromService(payloads, services) {
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

export default props => {
    var services = generateUniqueServices(props.payloads)
    var statuses = getStatusesFromService(props.payloads, services)
    return services.map(service => 
        <div style={{padding: '10px'}}>
            <TrackGraphic 
                service={service} 
                statuses={statuses[service]}
            />
        </div>
    )
};