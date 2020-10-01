import * as AppActions from '../actions';

import {
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Pagination,
    Split,
    SplitItem
} from '@patternfly/react-core';

import ExportsDropdown from './ExportsDropdown';
import OptionsContainer from './OptionsContainer';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const PayloadsPagination = ({ count, page_size, page, updatePageSize, updatePageNumber, children }) => <Card>
    <CardTitle>
        <Split hasGutter>
            <SplitItem>
                <OptionsContainer/>
            </SplitItem>
            <SplitItem>
                <ExportsDropdown/>
            </SplitItem>
            <SplitItem isFilled/>
            <SplitItem>
                <Pagination
                    isCompact
                    itemCount={count}
                    perPage={page_size}
                    page={page}
                    onSetPage={(_event, pageNumber) => updatePageNumber(pageNumber)}
                    widgetId="pagination-options-menu-top"
                    onPerPageSelect={(_event, perPage) => updatePageSize(perPage)}
                />
            </SplitItem>
        </Split>
    </CardTitle>
    <CardBody>
        {children}
    </CardBody>
    <CardFooter>
        <Split hasGutter>
            <SplitItem isFilled/>
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
</Card>;

PayloadsPagination.propTypes = {
    count: PropTypes.number,
    page_size: PropTypes.number,
    page: PropTypes.number,
    updatePageSize: PropTypes.func,
    updatePageNumber: PropTypes.func,
    children: PropTypes.node
};

const mapStateToProps = state => ({
    count: state.data.count,
    page: state.payloads.page,
    page_size: state.payloads.page_size
});

const mapDispatchToProps = dispatch => ({
    updatePageSize: (perPage) => dispatch(AppActions.setPageSize(perPage)),
    updatePageNumber: (pageNumber) => dispatch(AppActions.setPage(pageNumber))
});

export default connect(mapStateToProps, mapDispatchToProps)(PayloadsPagination);
