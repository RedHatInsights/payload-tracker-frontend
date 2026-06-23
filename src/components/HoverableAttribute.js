import * as AppActions from '../actions';

import { Button, Tooltip } from '@patternfly/react-core';
import React, { useState } from 'react';

import { PlusCircleIcon } from '@patternfly/react-icons';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { truncateString } from '../utilities/Common';

const HoverableAttribute = ({ type, filter, value }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isHovered, setHover] = useState(false);

    const clickHandler = ()  => {
        if (type === 'track') {
            dispatch(AppActions.setTrackRequestID(value));
            navigate(`/app/payload-tracker/track?request_id=${value}`);
        } else if (type === 'filter') {
            dispatch(AppActions.stageFilters({ [filter]: value }));
        } else { return null; }
    };

    return <React.Fragment>
        {value.length > 12 ? <Tooltip content={value}>
            <Button icon={<>
                {truncateString(value, 12)}
                {<PlusCircleIcon visibility={isHovered ? 'visible' : 'hidden'} />}
            </>}
            onClick={clickHandler}
            variant='plain'
            onMouseOver={ () => setHover(true) }
            onMouseOut={ () => setHover(false) }
            />
        </Tooltip> : <Button icon={<>
            {value}
            {<PlusCircleIcon visibility={isHovered ? 'visible' : 'hidden'} />}
        </>}
        onClick={clickHandler}
        variant='plain'
        onMouseOver={ () => setHover(true) }
        onMouseOut={ () => setHover(false) }
        />}
    </React.Fragment>;
};

HoverableAttribute.propTypes = {
    type: PropTypes.string.isRequired,
    filter: PropTypes.string,
    value: PropTypes.string.isRequired
};

export default HoverableAttribute;
