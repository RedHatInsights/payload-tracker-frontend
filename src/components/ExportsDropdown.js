import { Dropdown, DropdownItem, DropdownToggle } from '@patternfly/react-core';
import React, { useState } from 'react';

import { CSVLink } from 'react-csv';
import PropTypes from 'prop-types';
import { TableIcon } from '@patternfly/react-icons';
import { connect } from 'react-redux';

const ExportsDropdown = ({ payloads }) => {

    const [isOpen, setOpen] = useState(false)

    return <Dropdown
        onSelect={() => setOpen(false)}
        toggle={
            <DropdownToggle
                onToggle={() => setOpen(!isOpen)}
            >
                <TableIcon/>
            </DropdownToggle>
        }
        isOpen={isOpen}
        position='left'
        dropdownItems={[
            <DropdownItem>
                <CSVLink data={payloads}>
                    Export .csv
                </CSVLink>
            </DropdownItem>
        ]}
    />;
};

ExportsDropdown.propTypes = {
    payloads: PropTypes.array
};

const mapStateToProps = state => ({
    payloads: state.data.payloads
});

export default connect(mapStateToProps, null)(ExportsDropdown);