import * as AppActions from '../actions';

import { Button, Tooltip } from '@patternfly/react-core';
import React, { useState } from 'react';

import { PlusCircleIcon } from '@patternfly/react-icons';
import PropTypes from 'prop-types';
import { TRACK_ITEM } from '../AppConstants'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const HoverableAttribute = ({ type, filter, value, setRequestID, stageFilters, beginTracking }) => {

    const [isHovered, setHover] = useState(false);
    let history = useHistory();

    const clickHandler = ()  => {
        if (type === 'track') {
            setRequestID(value);
            history.push(`/track/${value}`);
            beginTracking(TRACK_ITEM);
        } else if (type === 'filter') {
            stageFilters({ [filter] : value });
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
                {`${value.substring(0, 12)}...`} {isHovered ? <PlusCircleIcon/> : null }
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
    value: PropTypes.string.isRequired,
    setRequestID: PropTypes.func,
    stageFilters: PropTypes.func,
    beginTracking: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
    setRequestID: (id) => dispatch(AppActions.setTrackRequestID(id)),
    stageFilters: (filters) => dispatch(AppActions.stageFilters(filters)),
    beginTracking: (item) => dispatch([
        AppActions.setActiveItem(item)
    ])
});

export default connect(null, mapDispatchToProps)(HoverableAttribute);