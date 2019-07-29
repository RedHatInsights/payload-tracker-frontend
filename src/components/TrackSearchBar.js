import React, { useState } from 'react';
import { Button, TextInput } from '@patternfly/react-core';
import { setTrackPayloadID } from '../actions';
import { push } from 'connected-react-router';

const TrackSearchBar = props => {

    const [payload_id, setPayloadID] = useState(props.payload_id)

    const handlePayloadIDInputChange = payload_id => {
        setPayloadID(payload_id)
    }

    const submitQuery = () => {
        props.dispatch(setTrackPayloadID(payload_id));
    }

    return (
        <div>
            <TextInput
                isRequired
                id='payload_id'
                type="text"
                name="payload_id"
                value={payload_id}
                onChange={handlePayloadIDInputChange}
                style={inputStyle}
                placeholder='Enter Payload ID...'
            />
            <Button 
                variant='primary' 
                onClick={(e) => submitQuery()} 
                isDisabled={payload_id === ""}> 
                    Submit
            </Button>
        </div>
    )
};

const inputStyle = {
    width: '90%',
    marginBottom: '10px',
    marginRight: '10px',
    boxSizing: 'border-box',
}

export default TrackSearchBar;