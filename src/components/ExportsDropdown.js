import { Dropdown, DropdownItem, DropdownToggle } from '@patternfly/react-core';
import React, { useState } from 'react';

import { CSVLink } from 'react-csv';
import { ExportIcon } from '@patternfly/react-icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ExportsDropdown = ({ payloads }) => {

    const [isOpen, setOpen] = useState(false)

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
            <DropdownItem>
                <CSVLink data={payloads}>
                    Export CSV
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