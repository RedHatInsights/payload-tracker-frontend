import * as AppActions from '../actions';

import { Button, TextInput } from '@patternfly/react-core';
import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const TrackSearchBar = ({ request_id, setRequestID }) => {

    const [id, updateID] = useState();

    useEffect(() => {
        updateID(request_id);
    }, [request_id]);

    return <React.Fragment>
            <TextInput
                isRequired
                id='request_id'
                type="text"
                name="request_id"
                value={id}
                onChange={(id) => updateID(id)}
                style={inputStyle}
                placeholder='Enter Request ID...'
            />
            <Button
                variant='primary'
                onClick={() => setRequestID(id)}
                isDisabled={id === ""}>
                    Submit
            </Button>
    </React.Fragment>;
};

const inputStyle = {
    width: '90%',
    marginBottom: '10px',
    marginRight: '10px',
    boxSizing: 'border-box',
}

TrackSearchBar.propTypes = {
    request_id: PropTypes.string,
    setRequestID: PropTypes.func
};

const mapStateToProps = state => ({
    request_id: state.track.request_id
});

const mapDispatchToProps = dispatch => ({
    setRequestID: (id) => dispatch(AppActions.setTrackRequestID(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackSearchBar);