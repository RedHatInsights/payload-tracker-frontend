import React, { useState } from 'react';
import { Dropdown, DropdownToggle } from '@patternfly/react-core';
import { TableIcon } from '@patternfly/react-icons';
import { CSVLink } from 'react-csv';

const ExportsDropdown = props => {

    const [isOpen, setOpen] = useState(false)

    return (
        <Dropdown
            onSelect={() => setOpen(false)}
            toggle={
                <DropdownToggle
                    onToggle={() => setOpen(!isOpen)}
                >
                    <TableIcon/>
                </DropdownToggle>
            }
            isOpen={isOpen}
        >
            <CSVLink data={props.data}>
                Export .csv
            </CSVLink>
        </Dropdown>
    )
};

export default ExportsDropdown;