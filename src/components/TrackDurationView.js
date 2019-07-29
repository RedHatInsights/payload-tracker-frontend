import React, { useEffect } from 'react';
import { Card, CardHeader, CardBody, Gallery, GalleryItem } from '@patternfly/react-core'
import { updateTrackDuration } from '../actions';

function generateDurationForService(service, payloads) {
    var statuses = []
    payloads.map(payload => {
        if (payload.service == service) {
            var durationInMilliseconds = Date.parse(payload.created_at);
            statuses.push(durationInMilliseconds);
        }
    })
    statuses.sort();
    return ((statuses[statuses.length - 1] - statuses[0]) * 0.001).toFixed(2);
}

function getStatus(service, payloads) {
    for (var i = 0; i < payloads.length; i++) {
        var payload = payloads[i];
        if (service === payload.service) {
            if (payload.status === 'success' || payload.status === '202') {
                return true;
            }
        }
    }
    return false;
};

const DurationGraphic = props => {

    useEffect(() => {
        props.dispatch(updateTrackDuration(props.duration))
    }, []);

    return (
        <div style={{
            background: 
                props.status ? 
                '#92d400' :
                '#c9190b',
            borderRadius: '50%',
            width: '100px',
            height: '100px',
            MozBoxSizing: 'border-box',
            boxSizing: 'border-box',
        }}>
            <p style={{
                textAlign: 'center',
                padding: '30px 0px',
                fontSize: '20pt',
            }}>
                {`${props.duration}s`}
            </p>
        </div>
    )
}

export default props => {
    return (
        <Gallery gutter='md'>
            {props.services.map(service =>
                <GalleryItem>
                    <Card>
                        <CardHeader>
                            {service}
                        </CardHeader>
                        <CardBody>
                            <DurationGraphic
                                duration={generateDurationForService(service, props.payloads)}
                                status={getStatus(service, props.payloads)}
                                {...props}
                            />
                        </CardBody>
                    </Card>
                </GalleryItem>
            )}
        </Gallery>
    )
};