import { Dropdown, DropdownItem, DropdownList, MenuToggle } from '@patternfly/react-core';
import React, { useState } from 'react';

import { CSVLink } from 'react-csv';
import { ExportIcon } from '@patternfly/react-icons';
import { shallowEqual, useSelector } from 'react-redux';

const ExportsDropdown = () => {
    const payloads = useSelector((state) => state.data.payloads, shallowEqual);

    const [isOpen, setOpen] = useState(false);

    return <Dropdown
        onSelect={() => setOpen(false)}
        toggle={(toggleRef) => (
            <MenuToggle
                ref={toggleRef}
                onClick={() => setOpen(!isOpen)}
                isExpanded={isOpen}
                variant="plain"
            >
                <ExportIcon/>
            </MenuToggle>
        )}
        isOpen={isOpen}
        onOpenChange={setOpen}
    >
        <DropdownList>
            <DropdownItem key={0}>
                <CSVLink data={payloads}>
                    Export CSV
                </CSVLink>
            </DropdownItem>
        </DropdownList>
    </Dropdown>;
};

export default ExportsDropdown;
