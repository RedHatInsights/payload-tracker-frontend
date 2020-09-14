import * as AppActions from '../../actions';
import * as ConstantTypes from '../../AppConstants';

import {
    Card,
    CardBody,
    CardHeader,
    Flex,
    FlexItem,
    PageSection,
    Tab,
    Tabs,
    Text,
    TextContent
} from '@patternfly/react-core';
import React, { useEffect, useState } from 'react';

import Durations from './Durations';
import ExportsDropdown from '../ExportsDropdown';
import OptionsContainer from '../OptionsContainer';
import PropTypes from 'prop-types';
import TrackGraphic from './TrackGraphicView';
import TrackSearchBar from './TrackSearchBar';
import TrackTable from './TrackTable';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';

const socket = openSocket(`${ConstantTypes.API_URL}/`, {transports: ['websocket', 'polling', 'flashsocket']});
const queryBase = `${ConstantTypes.API_URL}/v1/payloads/`;

const Track = ({ request_id, sort_by, sort_dir, payloads, durations, search, addPayload, updateDurations }) => {
    const [activeTabKey, setActiveTabKey] = useState(0);

    useEffect(() => {
        request_id && search(queryBase + `${request_id}?sort_by=${sort_by}&sort_dir=${sort_dir}`, request_id);
    }, [request_id, sort_by, sort_dir, search]);

    useEffect(() => {
        socket.on('payload', (incoming) => incoming.request_id === request_id && addPayload(incoming));
        socket.on('duration', (incoming) => {
            const { id, key, data } = incoming;
            durations && id === request_id && updateDurations({ [key]: data })
        });
    }, [request_id, payloads, addPayload]);

    return <PageSection>
        <TrackSearchBar/>
        { request_id && payloads.length > 0 && <React.Fragment>
            <Durations/>
            <Tabs activeKey={activeTabKey} onSelect={ (e, index) => setActiveTabKey(index) }>
                <Tab eventKey={0} title='Status'>
                    <Card>
                        <CardHeader>
                        </CardHeader>
                        <CardBody>
                            <TrackGraphic/>
                        </CardBody>
                    </Card>
                </Tab>
                <Tab eventKey={1} title='Table'>
                    <Card>
                        <CardHeader>
                            <Flex direction={{default: 'row'}}>
                                <FlexItem>
                                    <OptionsContainer isDisabled={request_id ? false : true}/>
                                </FlexItem>
                                <FlexItem>
                                    <ExportsDropdown/>
                                </FlexItem>
                            </Flex>
                        </CardHeader>
                        <CardBody>
                            <TrackTable/>
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </React.Fragment>}
    </PageSection>;
};

Track.propTypes = {
    request_id: PropTypes.any,
    sort_by: PropTypes.string,
    sort_dir: PropTypes.string,
    payloads: PropTypes.array,
    durations: PropTypes.array,
    search: PropTypes.func,
    addPayload: PropTypes.func,
    updateDurations: PropTypes.func
};

const mapStateToProps = state => ({
    request_id: state.track.request_id,
    sort_by: state.track.sort_by,
    sort_dir: state.track.sort_dir,
    payloads: state.data.payloads,
    durations: state.data.durations
});

const mapDispatchToProps = dispatch => ({
    search: (url, request_id) => dispatch([
        AppActions.getPayloadTrack(url),
        AppActions.setTrackRequestID(request_id)
    ]),
    addPayload: (data) => dispatch(AppActions.addPayloadFromSocket(data)),
    updateDurations: (data) => dispatch(AppActions.updateDurationsFromSocket(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Track);