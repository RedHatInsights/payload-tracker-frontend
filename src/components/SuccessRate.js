import React, { Component } from 'react';
import { PageSection, Gallery, GalleryItem, PageSectionVariants, Card, CardBody } from '@patternfly/react-core';
import { ChartPie, ChartThemeColor, ChartLegend } from '@patternfly/react-charts';
import { SphereSpinner } from 'react-spinners-kit';

const query = '/v1/stats?stat=SuccessRate'

class SuccessRate extends Component {
    state = {
        result: [],
        loading: false,
    }

    componentDidMount() {
        this.search()
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
            const { success, failure, successPercent, failPercent } = value;
            data.push([service, success, failure]);
        })
        return data;
    }

    render() {
        var data = this.createDataList()
        const { loading } = this.state;
        return(
            <PageSection variant={PageSectionVariants.light}>
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
        );
    };
};

export default SuccessRate