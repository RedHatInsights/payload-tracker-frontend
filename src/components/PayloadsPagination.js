import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import PayloadsTable from './PayloadsTable'
import {
    Pagination, CardBody, Card, CardHeader, CardFooter, SplitItem, Split, Button
} from '@patternfly/react-core';
import { SphereSpinner } from 'react-spinners-kit';
import { setPayloadsPage, setPayloadsPageSize, removePayloadsPage, removePayloadsPageSize } from '../actions';
import OptionsContainer from './OptionsContainer';
import ExportsDropdown from './ExportsDropdown';
import DateRangeFilter from './DateRangeFilter';

const PayloadsPagination = props => {
    return (
        <Card>
            <CardHeader>
                <Split gutter='md'>
                    <SplitItem>
                        <OptionsContainer
                            {...props}
                        />
                    </SplitItem>
                    <SplitItem>
                        <ExportsDropdown data={props.payloads}/>
                    </SplitItem>
                    <SplitItem>
                        {/* <DateRangeFilter
                            filters={props.payloadsParams.filters}
                            start={props.payloadsParams.startDate}
                            end={props.payloadsParams.endDate}
                            {...props}
                        /> */}
                    </SplitItem>
                    <SplitItem isFilled/>
                    <SplitItem>
                        <Pagination 
                            itemCount={props.count}
                            perPage={props.page_size}
                            page={props.page}
                            onSetPage={
                                (_event, pageNumber) => {
                                    props.dispatch(removePayloadsPage())
                                    props.dispatch(setPayloadsPage(pageNumber))
                                }
                            }
                            widgetId="pagination-options-menu-top"
                            onPerPageSelect={
                                (_event, perPage) => {
                                    props.dispatch(removePayloadsPageSize())
                                    props.dispatch(setPayloadsPageSize(perPage))
                                }
                            }
                        />
                    </SplitItem>
                </Split>
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
                <Split gutter='md'>
                    <SplitItem isFilled/>
                    <SplitItem>
                        <Pagination 
                            itemCount={props.count}
                            perPage={props.page_size}
                            page={props.page}
                            onSetPage={
                                (_event, pageNumber) => {
                                    props.dispatch(removePayloadsPage())
                                    props.dispatch(setPayloadsPage(pageNumber))
                                }
                            }
                            widgetId="pagination-options-menu-top"
                            onPerPageSelect={
                                (_event, perPage) => {
                                    props.dispatch(removePayloadsPageSize())
                                    props.dispatch(setPayloadsPageSize(perPage))
                                }
                            }
                        />
                    </SplitItem>
                </Split>
            </CardFooter>
        </Card>
    )
}

export default PayloadsPagination;