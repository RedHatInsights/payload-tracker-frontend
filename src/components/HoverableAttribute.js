import React, { useState } from 'react';
import { Button } from '@patternfly/react-core';
import { PlusCircleIcon } from '@patternfly/react-icons';

const clickHandler = (props, key, value)  => {
    return function () {
        props.updateParameters({name: key, value: value})
        props.runRedirect()
    }
}

const HoverableAttribute = props => {

    const [isHovered, setHover] = useState(false);

    return(
        <Button 
            onClick={ clickHandler(props, props.payloadKey, props.payloadValue) }
            variant='plain'
            onMouseOver={ () => setHover(true) }
            onMouseOut={ () => setHover(false) }
        
        >
            {props.payloadValue} {isHovered ? <PlusCircleIcon/> : null }
        </Button>
    )
}

export default HoverableAttribute;