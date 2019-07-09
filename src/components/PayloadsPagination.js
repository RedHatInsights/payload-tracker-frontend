import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import PayloadsTable from './PayloadsTable'
import {
    Pagination, CardBody, Card, CardHeader, CardFooter
} from '@patternfly/react-core';
import { SphereSpinner } from 'react-spinners-kit';
import OptionsContainer from './OptionsContainer';

const PayloadsPagination = props => {
    return (
        <Card>
            <div>
                <CardHeader>
                    <div>
                        <div style={{float:'right'}}>
                            <Pagination 
                                itemCount={props.count}
                                perPage={props.page_size}
                                page={props.page}
                                onSetPage={
                                    (_event, pageNumber) => {
                                        props.updateParameters({name: 'page', value: pageNumber});
                                        props.runRedirect();
                                    }
                                }
                                widgetId="pagination-options-menu-top"
                                onPerPageSelect={
                                    (_event, perPage) => {
                                        props.updateParameters({name: 'page_size', value: perPage});
                                        props.runRedirect();
                                    }
                                }
                            />
                        </div>
                        <div>
                            <OptionsContainer
                                {...props}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <SphereSpinner loading={props.loading} color='#000000' size={70}/>
                    </div>
                    <PayloadsTable 
                        {...props}
                    />
                </CardBody>
                <CardFooter>
                    <Pagination 
                        itemCount={props.count}
                        perPage={props.page_size}
                        page={props.page}
                        onSetPage={
                            (_event, pageNumber) => {
                                props.updateParameters({name: 'page', value: pageNumber});
                                props.runRedirect();
                            }
                        }
                        widgetId="pagination-options-menu-bottom"
                        onPerPageSelect={
                            (_event, perPage) => {
                                props.updateParameters({name: 'page_size', value: perPage});
                                props.runRedirect();
                            }
                        }
                    />
                </CardFooter>
            </div>
        </Card>
    )
}

export default PayloadsPagination;