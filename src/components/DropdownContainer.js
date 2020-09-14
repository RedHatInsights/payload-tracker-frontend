import {
    Dropdown,
    DropdownItem,
    DropdownPosition,
    DropdownToggle
} from '@patternfly/react-core';
import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

const DropdownContainer = ({ items, type, setSelected, position }) => {

    const [isOpen, setOpen] = useState(false);
    const [dropdownItems, setItems] = useState([]);

    useEffect(() => {
        let mapped = items.map(function(item) {
            return <DropdownItem
                key={item}
                component='button'
                onClick={ () => setSelected(type, item) }
            >
                {item}
            </DropdownItem>;
        });
        setItems(mapped);
    }, [setItems, items, type, setSelected]);

    return <Dropdown
        toggle={<DropdownToggle isPrimary onToggle={() => setOpen(!isOpen)}>{type}</DropdownToggle>}
        isOpen={isOpen}
        dropdownItems={dropdownItems}
        position={position}
    />;
};

DropdownContainer.propTypes = {
    items: PropTypes.array,
    type: PropTypes.string,
    setSelected: PropTypes.func,
    position: PropTypes.any
};

DropdownContainer.defaultProps = {
    position: DropdownPosition.right
};

export default DropdownContainer;
