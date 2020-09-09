import * as AppActions from '../actions';

import { Button, Tooltip } from '@patternfly/react-core';
import React, { useState } from 'react';

import { PlusCircleIcon } from '@patternfly/react-icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

const HoverableAttribute = ({ type, filter, value, push, setRequestID, stageFilters }) => {

    const [isHovered, setHover] = useState(false);

    const clickHandler = ()  => {
        if (type === 'track') {
            setRequestID(value);
            push(`/track/${value}`);
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
    push: PropTypes.func,
    setRequestID: PropTypes.func,
    stageFilters: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
    push: (url) => dispatch(push(url)),
    setRequestID: (id) => dispatch(AppActions.setTrackRequestID(id)),
    stageFilters: (filters) => dispatch(AppActions.stageFilters(filters)),
});

export default connect(null, mapDispatchToProps)(HoverableAttribute);