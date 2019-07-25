import React, { Component } from 'react';
import { Page, PageSection, Gallery, GalleryItem, PageSectionVariants, Card, CardBody } from '@patternfly/react-core';
import { ChartPie, ChartThemeColor, ChartLegend } from '@patternfly/react-charts';
import { connect } from 'react-redux';
import { MAP_STATE_TO_PROPS } from '../AppConstants'; 
import { SphereSpinner } from 'react-spinners-kit';
import MainHeader from './MainHeader';
import MainSidebar from './MainSidebar';

const query = '/v1/stats?stat=SuccessRate'

class SuccessRate extends Component {
    state = {
        result: [],
        loading: false,
        isNavOpen: true,
    }

    componentDidMount() {
        this.search()
    }

    runRedirect = path => {
        this.props.history.push(path)
    }

    search = () => {
        this.setState({loading: true});
        fetch(query)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({loading: false});
            this.setState({
                result: result,
            });
          },
          (error) => {
            this.setState({loading: false});
            this.setState({
              error
            });
          }
        )
        .then(this.createDataList())
        .then(this.forceUpdate())
    }

    createDataList() {
        var data = [];
        Object.entries(this.state.result).forEach(([service, value]) => {
            const { success, failure } = value;
            data.push([service, success, failure]);
        })
        return data;
    }

    render() {
        var data = this.createDataList()
        const { loading } = this.state;
        console.log(data);
        return(
            <Page 
                header={<MainHeader/>} 
                sidebar={
                    <MainSidebar 
                        activeGroup={this.props.activeGroup}
                        activeItem={this.props.activeItem}
                        dispatch={this.props.dispatch}
                        history={this.props.history}
                    />
                } 
                isManagedSidebar
            >
                <PageSection variant={PageSectionVariants.light} style={{minHeight:'800px'}}>
                    <div style={{paddingBottom: '10px'}}>
                        Last 24 Hours
                    </div>
                    <Gallery gutter='md'>
                        {data.map(([service, success, failure]) =>
                            <GalleryItem key={service}>
                                <Card>
                                    <CardBody>
                                        {service}
                                        <ChartPie
                                            data={[{ x: 'Success', y: success }, { x: 'Failure', y: failure }]}
                                            height={275}
                                            labels={datum => `${datum.x}: ${datum.y}`}
                                            legendData={[{ name: `Success: ${success}` }, { name: `Failure: ${failure}` }]}
                                            legendPosition="bottom"
                                            pieHeight={230}
                                            themeColor={ChartThemeColor.multi}
                                            width={300}
                                        />
                                        <ChartLegend
                                            data={[{ name: `Success: ${success}` }, { name: `Failure: ${failure}` }]}
                                            height={20}
                                            themeColor={ChartThemeColor.multi}
                                        />
                                    </CardBody>
                                </Card>
                            </GalleryItem>
                        )}
                    </Gallery>
                    <div style={{display: 'flex', justifyContent: 'center', padding:'50px'}}>
                        <SphereSpinner loading={loading} color='#000000' size={70}/>
                    </div>
                </PageSection>
            </Page>
        );
    };
};

export default connect(MAP_STATE_TO_PROPS)(SuccessRate);