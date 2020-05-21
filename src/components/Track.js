import * as AppActions from '../actions';

import {
    Card,
    CardBody,
    CardHeader,
    Page,
    PageSection,
    PageSectionVariants,
    Tab,
    Tabs
} from '@patternfly/react-core';
import React, { useEffect } from 'react';

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

const Track = ({ request_id, sort_by, sort_dir, activeTabKey, payloads, durations, loading, search, setActiveTabKey }) => {

    useEffect(() => {
        request_id && search(queryBase + `${request_id}?sort_by=${sort_by}&sort_dir=${sort_dir}`, request_id);
    }, [request_id, sort_by, sort_dir, search]);

    useEffect(() => {
        socket.on('payload', (data) => {
            data.request_id === request_id && payloads.unshift(data)
        });
    }, [request_id, payloads]);

    return(
        <Page
            header={<MainHeader/>}
            sidebar={<MainSidebar/>}
            isManagedSidebar
        >
            <PageSection variant={PageSectionVariants.dark}>
                <TrackSearchBar/>
            </PageSection>
            <PageSection
                variant={PageSectionVariants.light}
                style={{height:'80vh', overflow:'auto'}}
            >
                <Tabs activeKey={activeTabKey} onSelect={ (e, index) => setActiveTabKey(index) }>
                    <Tab eventKey={0} title='Status'>
                        <Card>
                            <CardHeader>
                                {request_id ? `request_id: ${request_id}` : ''}
                            </CardHeader>
                            <CardBody>
                                <TrackGraphic/>
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab eventKey={1} title='Duration'>
                        <Card>
                            <CardHeader>
                                <p> {request_id ? `request_id: ${request_id}` : ''} </p>
                                <p>
                                    {durations.hasOwnProperty('total_time') ? `Total Time: ${durations.total_time}` : ''}
                                </p>
                                <p>
                                    {durations.hasOwnProperty('total_time_in_services') ?
                                        `Total Time in Services: ${durations.total_time_in_services}` : ''}
                                </p>
                            </CardHeader>
                            <CardBody>
                                <TrackDuration/>
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab eventKey={2} title='Table'>
                        <Card>
                            <CardHeader>
                                <div style={{float: 'left'}}>
                                    <OptionsContainer isDisabled={request_id ? false : true}/>
                                </div>
                                <div style={{float: 'left', paddingLeft: '10px'}}>
                                    <ExportsDropdown data={payloads}/>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div style={{maxWidth: '100vw', overflow: 'auto'}}>
                                    <TrackTable isDisabled={request_id ? false : true}/>
                                </div>
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>
            </PageSection>
        </Page>
    )
};

Track.propTypes = {
    request_id: PropTypes.any,
    sort_by: PropTypes.string,
    sort_dir: PropTypes.string,
    activeTabKey: PropTypes.any,
    payloads: PropTypes.array,
    durations: PropTypes.array,
    loading: PropTypes.bool,
    search: PropTypes.func,
    setActiveTabKey: PropTypes.func
};

const mapStateToProps = state => ({
    request_id: state.track.request_id,
    sort_by: state.track.sort_by,
    sort_dir: state.track.sort_dir,
    activeTabKey: state.track.activeTabKey,
    payloads: state.data.payloads,
    durations: state.data.durations,
    loading: state.data.loading
});

const mapDispatchToProps = dispatch => ({
    search: (url, request_id) => dispatch([
        AppActions.getPayloadTrack(url),
        AppActions.setTrackRequestID(request_id)
    ]),
    setActiveTabKey: (key) => dispatch(AppActions.setActiveTabKey(key))
});

export default connect(mapStateToProps, mapDispatchToProps)(Track);