import * as AppActions from '../actions';

import {
    Card,
    CardBody,
    CardHeader,
    Flex,
    FlexItem,
    FlexModifiers,
    Page,
    PageSection,
    PageSectionVariants,
    Tab,
    Tabs,
    Text,
    TextContent
} from '@patternfly/react-core';
import React, { useEffect, useState } from 'react';

import ExportsDropdown from './ExportsDropdown';
import MainHeader from './MainHeader';
import MainSidebar from './MainSidebar';
import OptionsContainer from './OptionsContainer';
import PropTypes from 'prop-types';
import TrackDuration from './TrackDurationView';
import TrackGraphic from './TrackGraphicView';
import TrackSearchBar from './TrackSearchBar';
import TrackTable from './TrackTable';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';

const socket = openSocket('/', {transports: ['websocket', 'polling', 'flashsocket']});
const queryBase = '/v1/payloads/';

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

    return(
        <Page header={<MainHeader/>} sidebar={<MainSidebar/>} isManagedSidebar>
            <PageSection variant={PageSectionVariants.light}>
                <TrackSearchBar/>
                { request_id && payloads.length > 0 && <Tabs activeKey={activeTabKey} onSelect={ (e, index) => setActiveTabKey(index) }>
                    <Tab eventKey={0} title='Status'>
                        <Card>
                            <CardHeader>
                            </CardHeader>
                            <CardBody>
                                <TrackGraphic/>
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab eventKey={1} title='Duration'>
                        <Card>
                            <CardHeader>
                                <TextContent>
                                    <Text>
                                        {durations.hasOwnProperty('total_time') ? `Total Time: ${durations.total_time}` : ''}
                                    </Text>
                                    <Text>
                                        {durations.hasOwnProperty('total_time_in_services') ?
                                            `Total Time in Services: ${durations.total_time_in_services}` : ''}
                                    </Text>
                                </TextContent>
                            </CardHeader>
                            <CardBody>
                                <TrackDuration/>
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab eventKey={2} title='Table'>
                        <Card>
                            <CardHeader>
                                <Flex breakpointMods={[{modifier: FlexModifiers.row}]}>
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
                </Tabs>}
            </PageSection>
        </Page>
    )
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