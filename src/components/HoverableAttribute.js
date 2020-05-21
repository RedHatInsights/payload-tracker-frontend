import * as AppActions from '../actions';

import { HOME_GROUP, TRACK_ITEM } from '../AppConstants'
import React, { useState } from 'react';

import { Button } from '@patternfly/react-core';
import { PlusCircleIcon } from '@patternfly/react-icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const HoverableAttribute = ({ type, filter, value, setRequestID, updateFilters, beginTracking }) => {

    const [isHovered, setHover] = useState(false);
    let history = useHistory();

    const clickHandler = ()  => {
        if (type === 'track') {
            setRequestID(value);
            history.push(`/home/track/${value}`);
            beginTracking(TRACK_ITEM, HOME_GROUP);
        } else if (type === 'filter') {
            updateFilters(filter, value)
        } else { return null; }
    }

    return(
        <Button 
            onClick={clickHandler}
            variant='plain'
            onMouseOver={ () => setHover(true) }
            onMouseOut={ () => setHover(false) }
        >
            {value} {isHovered ? <PlusCircleIcon/> : null }
        </Button>
    )
};

HoverableAttribute.propTypes = {
    type: PropTypes.string.isRequired,
    filter: PropTypes.string,
    value: PropTypes.string.isRequired,
    setRequestID: PropTypes.func,
    updateFilters: PropTypes.func,
    beginTracking: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
    setRequestID: (id) => dispatch(AppActions.setTrackRequestID(id)),
    updateFilters: (key, value) => dispatch([
        AppActions.addFilter(key, value),
        AppActions.removePage(),
        AppActions.setPage(1)
    ]),
    beginTracking: (item, group) => dispatch([
        AppActions.setActiveItem(item),
        AppActions.setActiveGroup(group)
    ])
});

export default connect(null, mapDispatchToProps)(HoverableAttribute);