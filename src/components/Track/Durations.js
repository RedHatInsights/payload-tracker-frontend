import './Durations.scss';

import { Card, CardBody, CardHeader, Tooltip } from '@patternfly/react-core';
import React, { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SUCCESS_STATUSES = ['success'];
const ERROR_STATUSES = ['error', 'failed', 'processing_error'];

const Durations = ({ payloads, durations }) => {
    const [width, setWidth] = useState();
    const [totalTime, setTotalTime] = useState();
    const chartRef = useRef();
    const contains = (value, arr) => arr.filter(item => item === value).length > 0;
    const checkStatus = (service, statuses) => payloads.filter(payload => {
        return payload.service === service && contains(payload.status, statuses);
    }).length > 0;

    const getStatus = (service) => checkStatus(service, SUCCESS_STATUSES) ? 'success' : (
        checkStatus(service, ERROR_STATUSES) ? 'error' : ''
    );

    const reverse = (str) => str.split('').reverse().join('');

    const getSeconds = (str) => {
        const time = reverse(str);
        const arr = time.split(':');
        const timeArr = arr.map(timePart => parseFloat(reverse(timePart))).reverse();
        return (timeArr[0] * 3600) + (timeArr[1] * 60) + timeArr[2];
    };

    const isReadyToRender = () => Boolean(width && totalTime && getSeconds(durations?.total_time_in_services) !== 0);

    const computeServiceWidth = (duration, width) => width * (getSeconds(duration) / totalTime);

    const handleResize = () => chartRef.current && setWidth(chartRef.current.clientWidth);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        const total = durations?.total_time_in_services;
        total && width > 0 && setTotalTime(getSeconds(total));
        //eslint-disable-next-line
    }, [durations, width]);

    return <Card className='pt-c-durations'>
        <CardHeader>
            <div className='pt-c-durations__header'>
                <span>
                    {durations?.total_time && `Total Time: ${durations.total_time}`}
                </span>
                <span>
                    {durations?.total_time_in_services &&
                        `Total Time in Services: ${durations.total_time_in_services}`}
                </span>
            </div>
        </CardHeader>
        <CardBody>
            <div ref={chartRef} className={`pt-c-durations__chart ${!isReadyToRender() && 'hide'}`}>
                {isReadyToRender() && Object.entries(durations).map(([service, duration]) => {
                    if (!contains(service, ['total_time', 'total_time_in_services'])) {
                        return <Tooltip content={service}>
                            <div style={{ width: `${computeServiceWidth(duration, width)}px` }}
                                className={`pt-c-durations__service ${getStatus(service)}`}
                            />
                        </Tooltip>;
                    }
                })}
            </div>
            <div className='pt-c-durations__legend'>
                {Object.entries(durations).map(([service, duration]) => {
                    if (!contains(service, ['total_time', 'total_time_in_services'])) {
                        return <div className='pt-c-durations__legend--item'>
                            <div className={`pt-c-durations__legend--circle ${getStatus(service)}`}/>
                            <div className='pt-c-durations__legend--label'>
                                {`${service} | ${duration}`}
                            </div>
                        </div>;
                    }
                })}
            </div>
        </CardBody>
    </Card>;
};

Durations.propTypes = {
    payloads: PropTypes.array,
    durations: PropTypes.array
};

export default connect((state) => ({
    payloads: state.data.payloads,
    durations: state.data.durations
}), undefined)(Durations);
