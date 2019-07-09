import React, { Component } from 'react';
import {
    Page,
    PageSection,
    PageSectionVariants,
    Card,
    CardHeader,
    CardBody,
} from '@patternfly/react-core';
import { MAP_STATE_TO_PROPS } from '../AppConstants';
import TrackSearchBar from './TrackSearchBar';
import TrackTable from './TrackTable';
import openSocket from 'socket.io-client';
import { SphereSpinner } from 'react-spinners-kit';
import MainHeader from './MainHeader';
import MainSidebar from './MainSidebar';
import OptionsContainer from './OptionsContainer';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { getPayloadTrack } from '../actions';

const socket = openSocket('/', {transports: ['websocket', 'polling', 'flashsocket']});
const queryBase = '/v1/payloads/';

class Track extends Component {

    queryParameters = {
        sort_dir: 'desc',
        sort_by: 'date',
        payload_id: '',
    }

    componentWillMount() {
        this.setState({loading: false});
        socket.on('payload', (data) => {
            if(data.payload_id === this.queryParameters.payload_id){
                this.state.payloads.unshift(data)
                this.forceUpdate()
            }
        });

        const { payload_id } = this.props.match.params;
        this.updateParameters({name: 'payload_id', value: payload_id});
        
        const params = queryString.parse(this.props.location.search);
        Object.entries(params).forEach(([param, value]) => {
            this.updateParameters({name: param, value: value});
        });

        this.buildQuery();
    }

    updateParameters = newParam => {
        if (newParam.name === 'payload_id') {
            this.queryParameters.payload_id = newParam.value
        }
        else if (newParam.name === 'Sort Dir' || newParam.name === 'sort_dir') {
            this.queryParameters.sort_dir = newParam.value
            this.queryParameters.page = 1;
        }
        else if (newParam.name === 'Sort By' || newParam.name === 'sort_by') {
            this.queryParameters.sort_by = newParam.value
            this.queryParameters.page = 1;
        }
        this.buildQuery();
    }

    buildQuery = () => {
        const { payload_id, sort_by, sort_dir } = this.queryParameters
        if(payload_id !== '') {
            var query = queryBase + 
                `${payload_id}` +
                `?sort_by=${sort_by}` +
                `&sort_dir=${sort_dir}`
            this.search(query)
        }
    }

    runRedirect = (path=`/home/track/`) => {
        const { payload_id, sort_by, sort_dir } = this.queryParameters;
        this.props.history.push(path + `${payload_id}?sort_by=${sort_by}&sort_dir=${sort_dir}`);
        this.buildQuery();
    }

    search = (query) => {
        this.props.dispatch(getPayloadTrack(query));
    }

    render() {
        const { payload_id } = this.queryParameters;
        return(
            <Page 
                header={<MainHeader {...this.props} />} 
                sidebar={<MainSidebar {...this.props} />} 
                isManagedSidebar
            >
                <PageSection variant={PageSectionVariants.dark}>
                    <TrackSearchBar 
                        payload_id={payload_id ? payload_id : false}
                        buildQuery={this.buildQuery}
                        updateParameters={this.updateParameters}
                        runRedirect={this.runRedirect}
                    />
                </PageSection>
                <PageSection 
                    variant={PageSectionVariants.light}
                    style={{height:'80vh', overflow:'auto'}}
                >
                    <Card>
                        <CardHeader>
                            <OptionsContainer
                                {...this.props}
                            />
                        </CardHeader>
                        <CardBody>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <SphereSpinner loading={this.props.loading} color='#000000' size={70}/>
                            </div>
                            <TrackTable
                                runRedirect={this.runRedirect}
                                updateParameters={this.updateParameters}
                                {...this.props}
                            />
                        </CardBody>
                    </Card>
                </PageSection>
            </Page>
        )
    }
}

export default connect(MAP_STATE_TO_PROPS)(Track);