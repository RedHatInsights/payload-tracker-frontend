import { Card, CardBody, CardHeader, Gallery, GalleryItem } from '@patternfly/react-core';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

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

const DurationView = ({ payloads, durations }) => {

    const getStatus = (service, payloads) => {
        for (var i = 0; i < payloads.length; i++) {
            var payload = payloads[i];
            if (service === payload.service) {
                if (payload.status === 'success' || payload.status === '202' || payload.status === "announced") {
                    return true;
                }
            }
        }
        return false;
    };

    return (
        <Gallery gutter='md'>
            {Object.entries(durations).map(([service, duration]) =>
                service !== 'total_time' && service !== 'total_time_in_services' ?
                <GalleryItem>
                    <Card>
                        <CardHeader>
                            {service}
                        </CardHeader>
                        <CardBody>
                            <DurationGraphic
                                duration={duration}
                                status={getStatus(service, payloads)}
                            />
                        </CardBody>
                    </Card>
                </GalleryItem> : ''
            )}
        </Gallery>
    )
};

DurationView.propTypes = {
    payloads: PropTypes.array,
    durations: PropTypes.array
};

const mapStateToProps = state => ({
    payloads: state.data.payloads,
    durations: state.data.durations
});

export default connect(mapStateToProps, null)(DurationView);