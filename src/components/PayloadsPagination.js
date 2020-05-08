import '@patternfly/react-core/dist/styles/base.css';

import * as AppActions from '../actions';

import {
    ArrowDownIcon,
    ArrowUpIcon
} from '@patternfly/react-icons'
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Pagination,
    Split,
    SplitItem
} from '@patternfly/react-core';
import React, { useRef } from 'react';

import DateRangeFilter from './DateRangeFilter';
import ExportsDropdown from './ExportsDropdown';
import OptionsContainer from './OptionsContainer';
import PayloadsTable from './PayloadsTable'
import PropTypes from 'prop-types';
import { SphereSpinner } from 'react-spinners-kit';
import { connect } from 'react-redux';

const PayloadsPagination = ({ count, page_size, page, loading, updatePageSize, updatePageNumber }) => {

    const footerRef = useRef(null);
    const headerRef = useRef(null);
    const payloads_page = document.getElementById('payloads_page');

    return (
        <Card>
            <div ref={headerRef}>
                <CardHeader>
                    <Split gutter='md'>
                        <SplitItem>
                            <OptionsContainer/>
                        </SplitItem>
                        <SplitItem>
                            <ExportsDropdown/>
                        </SplitItem>
                        <SplitItem>
                            <DateRangeFilter/>
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
                                itemCount={count}
                                perPage={page_size}
                                page={page}
                                onSetPage={(_event, pageNumber) => updatePageNumber(pageNumber)}
                                widgetId="pagination-options-menu-top"
                                onPerPageSelect={(_event, perPage) => updatePageSize(perPage)}
                            />
                        </SplitItem>
                    </Split>
                </CardHeader>
            </div>
            <CardBody>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <SphereSpinner loading={loading} color='#000000' size={70}/>
                </div>
                <div style={{maxWidth:'100vw', overflow:'auto'}}>
                    <PayloadsTable/>
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
                                itemCount={count}
                                perPage={page_size}
                                page={page}
                                onSetPage={(_event, pageNumber) => updatePageNumber(pageNumber)}
                                widgetId="pagination-options-menu-top"
                                onPerPageSelect={(_event, perPage) => updatePageSize(perPage)}
                            />
                        </SplitItem>
                    </Split>
                </CardFooter>
            </div>
        </Card>
    )
};

PayloadsPagination.propTypes = {
    count: PropTypes.number,
    page_size: PropTypes.number,
    page: PropTypes.number,
    loading: PropTypes.bool,
    updatePageSize: PropTypes.func,
    updatePageNumber: PropTypes.func,
};

const mapStateToProps = state => ({
    count: state.data.count,
    page: state.payloads.page,
    page_size: state.payloads.page_size,
    loading: state.data.loading
});

const mapDispatchToProps = dispatch => ({
    updatePageSize: (perPage) => dispatch([
        AppActions.removePayloadsPageSize(),
        AppActions.setPayloadsPageSize(perPage)
    ]),
    updatePageNumber: (pageNumber) => dispatch([
        AppActions.removePayloadsPage(),
        AppActions.setPayloadsPage(pageNumber)
    ])
});

export default connect(mapStateToProps, mapDispatchToProps)(PayloadsPagination);