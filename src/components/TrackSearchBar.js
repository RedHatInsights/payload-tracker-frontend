import * as AppActions from '../actions';

import {
     Bullseye,
     Button,
     Card,
     EmptyState,
     EmptyStateBody,
     EmptyStateIcon,
     EmptyStateVariant,
     Flex,
     FlexItem,
     FlexModifiers,
     Text,
     TextContent,
     TextInput,
     TextVariants,
     Title
} from '@patternfly/react-core';
import { PlusCircleIcon, TimesCircleIcon } from '@patternfly/react-icons';
import React, { Suspense, useCallback, useEffect, useState } from 'react';

import { PAYLOADS_ITEM } from '../AppConstants';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

const TrackSearchBar = ({ request_id, payloads, loading, setRequestID, setActiveItem }) => {

    const [id, updateID] = useState();
    const [account, setAccount] = useState('');
    const [inventory_id, setInventoryID] = useState('')
    let history = useHistory();

    const clickHandler = (url) => {
        setActiveItem(PAYLOADS_ITEM);
        history.push(url);
    };

    const getAccount = useCallback(() => {
        const payloadsWithAccount = payloads.filter(p => p.account);
        return payloadsWithAccount.length > 0 ? payloadsWithAccount[0].account : ''
    }, [payloads]);

    const getInventoryID = useCallback(() => {
        const payloadsWithID = payloads.filter(p => p.inventory_id);
        return payloadsWithID.length > 0 ? payloadsWithID[0].inventory_id : ''
    }, [payloads]);

    useEffect(() => {
        payloads && setAccount(getAccount());
        payloads && setInventoryID(getInventoryID())
    }, [payloads, getAccount, getInventoryID]);

    return <React.Fragment>
        <TextInput
            isRequired
            id='request_id'
            type="text"
            name="request_id"
            value={id}
            onChange={(id) => updateID(id)}
            onKeyPress={(e) => e.key === 'Enter' && setRequestID(id)}
            style={inputStyle}
            placeholder='Enter a new Request ID...'
        />
        <Button
            variant='primary'
            onClick={() => setRequestID(id)}
            isDisabled={id === ""}>
                Submit
        </Button>
        <TextContent style={{marginBottom: '20px'}}>
            <Text component={TextVariants.h1}>
                Request Information
            </Text>
        </TextContent>
        <Card style={{marginBottom: '20px'}}>
            {request_id && payloads.length > 0 ? <Flex
                breakpointMods={[{modifier: FlexModifiers.column}]}
                style={{ margin: '10px' }}
            >
                <FlexItem> request_id: {request_id} </FlexItem>
                <Flex>
                    <FlexItem> account: {account} </FlexItem>
                    {account && <FlexItem breakpointMods={[{modifier: FlexModifiers["align-right"]}]}>
                        <Button
                            variant="link"
                            isInline
                            icon={<PlusCircleIcon/>}
                            onClick={() => clickHandler(`/payloads?account=${account}`) }
                        >
                            See more Requests for this Account
                        </Button>
                    </FlexItem>}
                </Flex>
                <Flex>
                    <FlexItem> inventory_id: {inventory_id} </FlexItem>
                    {inventory_id && <FlexItem breakpointMods={[{modifier: FlexModifiers["align-right"]}]}>
                        <Button
                            variant="link"
                            isInline
                            icon={<PlusCircleIcon/>}
                            onClick={() => clickHandler(`/payloads?inventory_id=${inventory_id}`)}
                        >
                            See more Requests for this ID
                        </Button>
                    </FlexItem>}
                </Flex>
            </Flex> : !loading && <Bullseye>
                <EmptyState variant={EmptyStateVariant.lg}>
                    <EmptyStateIcon icon={TimesCircleIcon} color='#c9190b'/>
                    {request_id ? <Title headingLevel='h1'>
                        Invalid request_id
                    </Title> : <Title headingLevel='h1'>
                        No request_id specified
                    </Title>}
                    <EmptyStateBody>
                        To see tracking information enter a valid request_id.
                    </EmptyStateBody>
                </EmptyState>
            </Bullseye>}
        </Card>
    </React.Fragment>;
};

const inputStyle = {
    width: '90%',
    marginBottom: '20px',
    marginRight: '10px',
    boxSizing: 'border-box',
}

TrackSearchBar.propTypes = {
    request_id: PropTypes.string,
    payloads: PropTypes.array,
    loading: PropTypes.bool,
    setRequestID: PropTypes.func,
    setActiveItem: PropTypes.func
};

const mapStateToProps = state => ({
    request_id: state.track.request_id,
    payloads: state.data.payloads,
    loading: state.data.loading
});

const mapDispatchToProps = dispatch => ({
    setRequestID: (id) => dispatch(AppActions.setTrackRequestID(id)),
    setActiveItem: (item) => dispatch(AppActions.setActiveItem(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackSearchBar);