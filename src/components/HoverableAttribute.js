import React, { useState } from 'react';
import { Button } from '@patternfly/react-core';
import { PlusCircleIcon } from '@patternfly/react-icons';
import { push } from 'connected-react-router';
import { setActiveItem, setActiveGroup, addPayloadsFilter, setTrackPayloadID } from '../actions';
import { TRACK_ITEM, HOME_GROUP } from '../AppConstants'

const clickHandler = (props, key, value)  => {
    if (props.type === 'track') {
        props.dispatch(setTrackPayloadID(value))
        props.history.push(`/home/track/${value}`)
        props.dispatch(push(`/home/track/${value}`))
        props.dispatch(setActiveItem(TRACK_ITEM))
        props.dispatch(setActiveGroup(HOME_GROUP))
    } else if (props.type === 'filter') {
        props.dispatch(addPayloadsFilter(key, value))
    } else { return null; }
}

const HoverableAttribute = props => {

    const [isHovered, setHover] = useState(false);

    return(
        <Button 
            onClick={ () => clickHandler(props, props.payloadKey, props.payloadValue) }
            variant='plain'
            onMouseOver={ () => setHover(true) }
            onMouseOut={ () => setHover(false) }
        >
            {props.payloadValue} {isHovered ? <PlusCircleIcon/> : null }
        </Button>
    )
}

export default HoverableAttribute;