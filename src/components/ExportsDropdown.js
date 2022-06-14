import { Dropdown, DropdownItem, DropdownToggle } from '@patternfly/react-core';
import React, { useState } from 'react';

import { CSVLink } from 'react-csv';
import { ExportIcon } from '@patternfly/react-icons';
import { shallowEqual, useSelector } from 'react-redux';

const ExportsDropdown = () => {
    const payloads = useSelector((state) => state.data.payloads, shallowEqual);

    const [isOpen, setOpen] = useState(false);

    return <Dropdown
        onSelect={() => setOpen(false)}
        toggle={
            <DropdownToggle
                toggleIndicator={null}
                onToggle={() => setOpen(!isOpen)}
            >
                <ExportIcon/>
            </DropdownToggle>
        }
        isOpen={isOpen}
        position='left'
        isPlain
        dropdownItems={[
            <DropdownItem key={0}>
                <CSVLink data={payloads}>
                    Export CSV
                </CSVLink>
            </DropdownItem>
        ]}
    />;
};

export default ExportsDropdown;
