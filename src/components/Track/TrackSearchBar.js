import './TrackSearchBar.scss';

import * as AppActions from '../../actions';

import {
    Bullseye,
    Button,
    Card,
    EmptyState,
    EmptyStateBody,
    EmptyStateIcon,
    EmptyStateVariant,
    Spinner,
    Text,
    TextContent,
    TextInput,
    TextVariants,
    Title
} from '@patternfly/react-core';
import { DownloadIcon, PlusCircleIcon, TimesCircleIcon } from '@patternfly/react-icons';
import React, { useCallback, useEffect, useState } from 'react';

import API from '../../utilities/Api';
import * as ConstantTypes from '../../AppConstants';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

const TrackSearchBar = ({ push, request_id, payloads, loading, hasDownloadRole, setRequestID }) => {

    const [id, updateID] = useState();
    const [account, setAccount] = useState('');
    const [inventory_id, setInventoryID] = useState('');

    const getAccount = useCallback(() => {
        const payloadsWithAccount = payloads.filter(p => p.account);
        return payloadsWithAccount.length > 0 ? payloadsWithAccount[0].account : '';
    }, [payloads]);

    const getInventoryID = useCallback(() => {
        const payloadsWithID = payloads.filter(p => p.inventory_id);
        return payloadsWithID.length > 0 ? payloadsWithID[0].inventory_id : '';
    }, [payloads]);

    const handleArchiveDownload = async () => {
        console.log('fetching archive download link for request_id: ' + request_id);
        API.get(`${ConstantTypes.API_URL}/api/v1/payloads/${request_id}/archiveLink`)
        .then(
            resp => {
                let archiveDownloadLink = resp.data.url;
                if (process.env.ENV) {
                    // remove everything before :9000
                    archiveDownloadLink = 'http://localhost' + archiveDownloadLink.substring(archiveDownloadLink.indexOf(':9000'));
                }

                window.open(archiveDownloadLink, '_blank');
            }
        );
    };

    useEffect(() => {
        payloads && setAccount(getAccount());
        payloads && setInventoryID(getInventoryID());
    }, [payloads, getAccount, getInventoryID]);

    return <React.Fragment>
        <div className='pt-c-track__search'>
            <TextInput
                className='pt-c-track__search--input'
                isRequired
                id='request_id'
                type="text"
                name="request_id"
                value={id}
                onChange={(id) => updateID(id)}
                onKeyPress={(e) => e.key === 'Enter' && setRequestID(id)}
                placeholder='Enter a new Request ID...'
            />
            <Button
                variant='primary'
                onClick={() => setRequestID(id)}
                isDisabled={id === ''}>
                    Submit
            </Button>
        </div>
        <TextContent className='pt-c-header'>
            <Text component={TextVariants.h1}>
                Request Information
            </Text>
        </TextContent>
        <Card className='pt-c-track__header'>
            {loading === 'pending' && <div className='pt-c-track__header--content'>
                <Bullseye>
                    <Spinner size='xl'/>
                </Bullseye>
            </div>}
            {loading === 'fulfilled' && <div className='pt-c-track__header--content'>
                <div className='pt-c-track__header--item'>
                    <span className='pt-c-track__header--title'> request_id: </span>
                    <span> {request_id} </span>
                    {
                        hasDownloadRole &&
                        <Button
                            className='pt-c-track__header--button'
                            variant='link'
                            isInline
                            icon={<DownloadIcon/>}
                            onClick={handleArchiveDownload}
                        >
                            Download Archive
                        </Button>
                    }
                </div>
                {account && <div>
                    <hr/>
                    <div className='pt-c-track__header--item'>
                        <span className='pt-c-track__header--title'> account: </span>
                        <span> {account} </span>
                        <Button
                            className='pt-c-track__header--button'
                            variant="link"
                            isInline
                            icon={<PlusCircleIcon/>}
                            onClick={() => push(`/app/payload-tracker/payloads?account=${account}`)}
                        >
                            See more Requests for this Account
                        </Button>
                    </div>
                </div>}
                {inventory_id && <div>
                    <hr/>
                    <div className='pt-c-track__header--item'>
                        <span className='pt-c-track__header--title'> inventory_id: </span>
                        <span> {inventory_id} </span>
                        <Button
                            className='pt-c-track__header--button'
                            variant="link"
                            isInline
                            icon={<PlusCircleIcon/>}
                            onClick={() => push(`/app/payload-tracker/payloads?inventory_id=${inventory_id}`)}
                        >
                            See more Requests for this ID
                        </Button>
                    </div>
                </div>}
            </div>}
            {(!loading || loading === 'rejected') && <Bullseye>
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

TrackSearchBar.propTypes = {
    push: PropTypes.func,
    request_id: PropTypes.string,
    payloads: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    hasDownloadRole: PropTypes.bool,
    setRequestID: PropTypes.func
};

const mapStateToProps = state => ({
    request_id: state.track.request_id,
    hasDownloadRole: state.track.has_download_role
});

const mapDispatchToProps = dispatch => ({
    push: (url) => dispatch(push(url)),
    setRequestID: (id) => dispatch(AppActions.setTrackRequestID(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackSearchBar);
