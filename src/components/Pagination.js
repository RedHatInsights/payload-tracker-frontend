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
import { useDispatch, useSelector } from 'react-redux';

const PayloadsPagination = ({ children }) => {
    const dispatch = useDispatch();

    const count = useSelector(state => state.data.count);
    const page_size = useSelector(state => state.payloads.page_size);
    const page = useSelector(state => state.payloads.page);

    return (<Card>
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
                        onSetPage={(_event, pageNumber) => dispatch(AppActions.setPage(pageNumber))}
                        widgetId="pagination-options-menu-top"
                        onPerPageSelect={(_event, perPage) => dispatch(AppActions.setPageSize(perPage))}
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
                        onSetPage={(_event, pageNumber) => dispatch(AppActions.setPage(pageNumber))}
                        widgetId="pagination-options-menu-top"
                        onPerPageSelect={(_event, perPage) => dispatch(AppActions.setPageSize(perPage))}
                    />
                </SplitItem>
            </Split>
        </CardFooter>
    </Card>);
};

PayloadsPagination.propTypes = {
    children: PropTypes.node
};

export default PayloadsPagination;
