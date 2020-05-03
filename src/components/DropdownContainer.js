import React, { useState, useEffect } from 'react';
import { 
    Dropdown,
    DropdownToggle, 
    DropdownItem, 
} from '@patternfly/react-core';

export default props => {

    const [isOpen, setOpen] = useState(false);
    const [dropdownItems, setItems] = useState([]);

    useEffect(() => {
        generateItems()
    }, [setItems])

    function generateItems() {
        var items = props.items.map(function(item) {
            return (
                <DropdownItem 
                    key={item}
                    component='button'
                    onClick={ () => props.setSelected(props.type, item) }
                >
                    {item}
                </DropdownItem>
            )
        })
        setItems(items)
    }

    return (
        <Dropdown
            toggle={<DropdownToggle onToggle={() => setOpen(!isOpen)}>{props.type}</DropdownToggle>}
            isOpen={isOpen}
            dropdownItems={dropdownItems}
        />
    )
}