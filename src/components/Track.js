import React, { Component } from 'react';
import {
    Page,
    PageSection,
    PageSectionVariants,
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

const socket = openSocket('/', {transports: ['websocket', 'polling', 'flashsocket']});
const queryBase = '/v1/payloads/';

class Track extends Component {

    state = {
        payloads: [],
        loading: false,
    }
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
        this.setState({loading: true});
        fetch(query)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({loading: false});
            this.setState({
                payloads: result,
            });
          },
          (error) => {
            this.setState({loading: false});
            this.setState({
              error
            });
          }
        )
        .then(this.forceUpdate())
    }

    render() {
        const { loading } = this.state;
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
                <PageSection variant={PageSectionVariants.light}>
                    <OptionsContainer
                        dispatch={this.props.dispatch}
                        cells={this.props.cells}
                    />
                    <TrackTable
                        payloads={this.state.payloads}
                        cells={this.props.cells}
                        runRedirect={this.runRedirect}
                        updateParameters={this.updateParameters}
                    />
                    <div style={{display: 'flex', justifyContent: 'center', padding:'50px'}}>
                        <SphereSpinner loading={loading} color='#000000' size={70}/>
                    </div>
                </PageSection>
            </Page>
        )
    }
}

export default connect(MAP_STATE_TO_PROPS)(Track);