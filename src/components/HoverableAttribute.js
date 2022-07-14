import * as AppActions from '../actions';

import { Button, Tooltip } from '@patternfly/react-core';
import React, { useState } from 'react';

import { PlusCircleIcon } from '@patternfly/react-icons';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { truncateString } from '../utilities/Common';

const HoverableAttribute = ({ type, filter, value }) => {
    const dispatch = useDispatch();

    const [isHovered, setHover] = useState(false);

    const clickHandler = ()  => {
        if (type === 'track') {
            dispatch(AppActions.setTrackRequestID(value));
            dispatch(push(`/app/payload-tracker/track?request_id=${value}`));
        } else if (type === 'filter') {
            dispatch(AppActions.stageFilters({ [filter]: value }));
        } else { return null; }
    };

    return <React.Fragment>
        {value.length > 12 ? <Tooltip content={value}>
            <Button
                onClick={clickHandler}
                variant='plain'
                onMouseOver={ () => setHover(true) }
                onMouseOut={ () => setHover(false) }
            >
                {truncateString(value, 12)} {isHovered ? <PlusCircleIcon/> : null }
            </Button>
        </Tooltip> : <Button
            onClick={clickHandler}
            variant='plain'
            onMouseOver={ () => setHover(true) }
            onMouseOut={ () => setHover(false) }
        >
            {value} {isHovered ? <PlusCircleIcon/> : null }
        </Button>}
    </React.Fragment>;
};

HoverableAttribute.propTypes = {
    type: PropTypes.string.isRequired,
    filter: PropTypes.string,
    value: PropTypes.string.isRequired
};

export default HoverableAttribute;
