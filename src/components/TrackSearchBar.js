import * as AppActions from '../actions';

import {
     Button,
     Card,
     Flex,
     FlexItem,
     FlexModifiers,
     Text,
     TextContent,
     TextInput,
     TextVariants
} from '@patternfly/react-core';
import React, { useCallback, useEffect, useState } from 'react';

import { PlusCircleIcon } from '@patternfly/react-icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

const TrackSearchBar = ({ request_id, payloads, setRequestID }) => {

    const [id, updateID] = useState();
    const [account, setAccount] = useState('');
    const [inventory_id, setInventoryID] = useState('')
    let history = useHistory();

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
            <Flex
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
                            onClick={() => history.push(`/payloads?account=${account}`) }
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
                            onClick={() => history.push(`/payloads?inventory_id=${inventory_id}`)}
                        >
                            See more Requests for this ID
                        </Button>
                    </FlexItem>}
                </Flex>
            </Flex>
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
    setRequestID: PropTypes.func
};

const mapStateToProps = state => ({
    request_id: state.track.request_id,
    payloads: state.data.payloads
});

const mapDispatchToProps = dispatch => ({
    setRequestID: (id) => dispatch(AppActions.setTrackRequestID(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackSearchBar);