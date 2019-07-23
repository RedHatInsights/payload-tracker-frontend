import React, { useRef } from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import PayloadsTable from './PayloadsTable'
import {
    Pagination, CardBody, Card, CardHeader, CardFooter, SplitItem, Split, Button
} from '@patternfly/react-core';
import {
    ArrowDownIcon, ArrowUpIcon
} from '@patternfly/react-icons'
import { SphereSpinner } from 'react-spinners-kit';
import { setPayloadsPage, setPayloadsPageSize, removePayloadsPage, removePayloadsPageSize } from '../actions';
import OptionsContainer from './OptionsContainer';
import ExportsDropdown from './ExportsDropdown';
import DateRangeFilter from './DateRangeFilter';

const PayloadsPagination = props => {

    const footerRef = useRef(null);
    const headerRef = useRef(null);
    const payloads_page = document.getElementById('payloads_page');

    return (
        <Card>
            <div ref={headerRef}>
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
                            <DateRangeFilter
                                filters={props.payloadsParams.filters}
                                start={props.payloadsParams.startDate}
                                end={props.payloadsParams.endDate}
                                {...props}
                            />
                        </SplitItem>
                        <SplitItem isFilled/>
                        <SplitItem>
                            <Button variant='plain' isInline onClick={ 
                                () => payloads_page.scrollTo(0, footerRef.current.offsetTop)
                            }>
                                <ArrowDownIcon/>
                            </Button>
                        </SplitItem>
                        <SplitItem>
                            <Pagination 
                                itemCount={props.count}
                                perPage={props.page_size}
                                page={props.page}
                                onSetPage={
                                    (_event, pageNumber) => {
                                        props.dispatch([
                                            removePayloadsPage(),
                                            setPayloadsPage(pageNumber)
                                        ])
                                    }
                                }
                                widgetId="pagination-options-menu-top"
                                onPerPageSelect={
                                    (_event, perPage) => {
                                        props.dispatch([
                                            removePayloadsPageSize(),
                                            setPayloadsPageSize(perPage)
                                        ])
                                    }
                                }
                            />
                        </SplitItem>
                    </Split>
                </CardHeader>
            </div>
            <CardBody>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <SphereSpinner loading={props.loading} color='#000000' size={70}/>
                </div>
                <div style={{maxWidth:'100vw', overflow:'auto'}}>
                    <PayloadsTable 
                        {...props}
                    />
                </div>
            </CardBody>
            <div ref={footerRef}>
                <CardFooter>
                    <Split gutter='md'>
                        <SplitItem isFilled/>
                        <SplitItem>
                            {/* HACK: scroll all the way to the top of the table */}
                            <Button variant='plain' isInline onClick={ 
                                () => payloads_page.scrollTo(0, headerRef.current.offsetTop - 200)
                            }>
                                <ArrowUpIcon/>
                            </Button>
                        </SplitItem>
                        <SplitItem>
                            <Pagination 
                                itemCount={props.count}
                                perPage={props.page_size}
                                page={props.page}
                                onSetPage={
                                    (_event, pageNumber) => {
                                        props.dispatch([
                                            removePayloadsPage(),
                                            setPayloadsPage(pageNumber)
                                        ])
                                    }
                                }
                                widgetId="pagination-options-menu-top"
                                onPerPageSelect={
                                    (_event, perPage) => {
                                        props.dispatch([
                                            removePayloadsPageSize(),
                                            setPayloadsPageSize(perPage)
                                        ])
                                    }
                                }
                            />
                        </SplitItem>
                    </Split>
                </CardFooter>
            </div>
        </Card>
    )
}

export default PayloadsPagination;