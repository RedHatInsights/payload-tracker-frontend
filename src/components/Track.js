import React, { Component } from 'react';
import {
    Page, PageSection, PageSectionVariants,
    Card, CardHeader, CardBody,
    Tabs, Tab
} from '@patternfly/react-core';
import { MAP_STATE_TO_PROPS, CHECK_OBJECT_EQUIVALENCE } from '../AppConstants';
import TrackSearchBar from './TrackSearchBar';
import TrackTable from './TrackTable';
import openSocket from 'socket.io-client';
import { SphereSpinner } from 'react-spinners-kit';
import MainHeader from './MainHeader';
import MainSidebar from './MainSidebar';
import OptionsContainer from './OptionsContainer';
import TrackGraphic from './TrackGraphicView';
import TrackDuration from './TrackDurationView';
import { connect } from 'react-redux';
import ExportsDropdown from './ExportsDropdown';
import { getPayloadTrack, setActiveTabKey, setTrackPayloadID } from '../actions'; 

const socket = openSocket('/', {transports: ['websocket', 'polling', 'flashsocket']});
const queryBase = '/v1/payloads/';

class Track extends Component {

    componentWillMount() {
        socket.on('payload', (data) => {
            if(data.payload_id === this.props.trackParams.payload_id){
                this.props.payloads.unshift(data);
                this.forceUpdate();
            }
        });
    }

    componentDidMount() {
        this.search();
    }

    componentDidUpdate(prevProps) {
        if (!CHECK_OBJECT_EQUIVALENCE(prevProps.trackParams, this.props.trackParams)) {
            this.search();
        }
    }

    search = () => {
        var query = queryBase;
        const { sort_by, sort_dir, payload_id } = this.props.trackParams

        if (payload_id) {
            query += `${payload_id}?sort_by=${sort_by}&sort_dir=${sort_dir}`
            this.props.dispatch([
                getPayloadTrack(query),
                setTrackPayloadID(payload_id)
            ]);
        }
    }

    render() {
        const { payload_id, sort_by, sort_dir, activeTabKey } = this.props.trackParams;
        const { durations, payloads } = this.props
        return(
            <Page 
                header={<MainHeader {...this.props} />} 
                sidebar={<MainSidebar {...this.props} />} 
                isManagedSidebar
            >
                <PageSection variant={PageSectionVariants.dark}>
                    <TrackSearchBar 
                        payload_id={payload_id ? payload_id : ""}
                        {...this.props}
                    />
                </PageSection>
                <PageSection 
                    variant={PageSectionVariants.light}
                    style={{height:'80vh', overflow:'auto'}}
                >
                    <Tabs activeKey={activeTabKey} onSelect={ (e, index) => this.props.dispatch(setActiveTabKey(index)) }>
                        <Tab eventKey={0} title='Status'>
                            <Card>
                                <CardHeader>
                                    {payload_id ? `payload_id: ${payload_id}` : ''}
                                </CardHeader>
                                <CardBody>
                                    <TrackGraphic 
                                        payloads={this.props.payloads}
                                    />
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab eventKey={1} title='Duration'>
                            <Card>
                                <CardHeader>
                                    <p> {payload_id ? `payload_id: ${payload_id}` : ''} </p>
                                    <p> 
                                        { durations ?
                                            (durations.hasOwnProperty('total') ? `Total Duration: ${durations.total}` : '')
                                            : '' 
                                        } 
                                    </p>
                                </CardHeader>
                                <CardBody>
                                    <TrackDuration
                                        durations={durations ? durations: {}}
                                        payloads={payloads}
                                    />
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab eventKey={2} title='Table'>
                            <Card>
                                <CardHeader>
                                    <div style={{float: 'left'}}>
                                        <OptionsContainer
                                            isDisabled={payload_id ? false : true}
                                            {...this.props}
                                        />
                                    </div>
                                    <div style={{float: 'left', paddingLeft: '10px'}}>
                                        <ExportsDropdown data={this.props.payloads}/>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <div style={{display: 'flex', justifyContent: 'center'}}>
                                        <SphereSpinner loading={this.props.loading} color='#000000' size={70}/>
                                    </div>
                                    <div style={{maxWidth: '100vw', overflow: 'auto'}}>
                                        <TrackTable
                                            isDisabled={payload_id ? false : true}
                                            sort_dir={sort_dir}
                                            sort_by={sort_by}
                                            {...this.props}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Tab>
                    </Tabs>
                </PageSection>
            </Page>
        )
    }
}

export default connect(MAP_STATE_TO_PROPS)(Track);