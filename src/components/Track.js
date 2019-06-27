import React, { Component } from 'react';
import {
    Page,
    PageSection,
    PageSectionVariants,
} from '@patternfly/react-core';
import TrackSearchBar from './TrackSearchBar';
import PayloadsTable from './PayloadsTable';
import openSocket from 'socket.io-client';
import { SphereSpinner } from 'react-spinners-kit';
import MainHeader from './MainHeader';
import MainSidebar from './MainSidebar';

const socket = openSocket('/', {transports: ['websocket', 'polling', 'flashsocket']});
const queryBase = '/v1/payloads/';

class Track extends Component {

    state = {
        payloads: [],
        isNavOpen: true,
    }
    queryParameters = {
        sort_dir: 'asc',
        sort_by: 'date',
        payload_id: '',
        loading: false,
    }

    componentDidMount() {
        this.setState({loading: false});
        socket.on('payload', (data) => {
            if(data.payload_id === this.queryParameters.payload_id){
                this.state.payloads.unshift(data)
                this.forceUpdate()
            }
        });
    }
    
    setNavStatus = () => {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }

    updateParameters = newParam => {
        if (newParam.name === 'payload_id') {
            this.queryParameters.payload_id = newParam.value
        }
        if (newParam.name === 'Sort Dir') {
            this.queryParameters.sort_dir = newParam.value
            this.queryParameters.page = 1;
        }
        if (newParam.name === 'Sort By') {
            this.queryParameters.sort_by = newParam.value
            this.queryParameters.page = 1;
        }
    }

    buildQuery = () => {
        if(this.queryParameters.payload_id !== '') {
            var query = queryBase + `${this.queryParameters.payload_id}?`
            Object.entries(this.queryParameters).forEach(([param, value]) => {
                query = query + `${param}=${value}&`
            });
            this.search(query)
        }
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
        const { loading, isNavOpen } = this.state;
        return(
            <Page header={<MainHeader setNavStatus={this.setNavStatus}/>} 
                  sidebar={<MainSidebar isNavOpen={isNavOpen}/>} isManagedSidebar>
                <PageSection variant={PageSectionVariants.dark}>
                    <TrackSearchBar 
                        buildQuery={this.buildQuery}
                        updateParameters={this.updateParameters}
                    />
                </PageSection>
                <PageSection variant={PageSectionVariants.light} style={{minHeight:'800px'}}>
                    <PayloadsTable
                        payloads={this.state.payloads}
                    />
                    <div style={{display: 'flex', justifyContent: 'center', padding:'50px'}}>
                        <SphereSpinner loading={loading} color='#000000' size={70}/>
                    </div>
                </PageSection>
            </Page>
        )
    }
}

export default Track;