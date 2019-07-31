import React from 'react';
import { Gallery, GalleryItem, Card, CardBody, CardHeader } from '@patternfly/react-core';

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
    return (
        <div style={{
            background: 
                props.status ? 
                '#92d400' :
                '#c9190b',
            borderRadius: '50%',
            width: '150px',
            height: '150px',
            MozBoxSizing: 'border-box',
            boxSizing: 'border-box',
        }}>
            <p style={{
                textAlign: 'center',
                padding: '60px 0px',
                fontSize: '13pt',
            }}>
                {`${props.duration}s`}
            </p>
        </div>
    )
}

export default props => {
    return (
        <Gallery gutter='md'>
            {Object.entries(props.durations).map(([service, duration]) =>
                service !== 'total' ?
                <GalleryItem>
                    <Card>
                        <CardHeader>
                            {service}
                        </CardHeader>
                        <CardBody>
                            <DurationGraphic
                                duration={duration}
                                status={getStatus(service, props.payloads)}
                            />
                        </CardBody>
                    </Card>
                </GalleryItem> : ''
            )}
        </Gallery>
    )
};