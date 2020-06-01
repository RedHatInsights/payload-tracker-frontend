import * as AppActions from '../actions';

import {
     Button,
     Chip,
     Flex,
     FlexItem,
     FlexModifiers,
     Modal,
     Text,
     TextContent,
     TextInput,
     TextVariants
} from '@patternfly/react-core';
import { PAYLOAD_FILTER_TYPES, STATUS_FILTER_TYPES } from '../AppConstants';
import React, { useState } from 'react';

import DropdownContainer from './DropdownContainer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

const SearchBar = ({ children, filters, removeStartDate, removeEndDate, addFilter, closeFilterChip, createFilterChip }) => {

    const [isModalOpen, setModalState] = useState(false);
    const [chipType, setChipType] = useState(undefined);
    const [chipValue, setChipValue] = useState(undefined);
    let history = useHistory();

    const closeChip = (id) => {
        for(var i = 0; i < filters.length; i++) {
            if (filters[i].id === id) {
                if (filters[i].type === 'date_gte') {
                    removeStartDate();
                } else if (filters[i].type === 'date_lte') {
                    removeEndDate();
                };
                closeFilterChip(id);
            };
        };
    };

    const createChip = () => {
        if (chipType && chipValue) {
            addFilter(chipType, chipValue);
            setChipType(undefined);
            setChipValue(undefined)
            createFilterChip();
        };
        setModalState(false);
    };

    const setSelected = (type, index) => {
        setModalState(true);
        setChipType(index);
    };

    return <React.Fragment>
        {isModalOpen && <Modal
            title='Add Filter'
            isOpen={isModalOpen}
            onClose={() => setModalState(false)}
            actions={[
                <Button
                    key="confirm"
                    variant="primary"
                    onClick={() => createChip()}
                    isDisabled={!chipValue}
                >
                    Confirm
                </Button>,
                <Button key="cancel" variant="link" onClick={() => setModalState(false)}>
                    Cancel
                </Button>
            ]}
            isFooterLeftAligned
        >
            <TextContent style={{ marginTop: '20px', marginBottom: '20px'}}>
                <Text component={TextVariants.p}>
                    Filter Type:  {chipType}
                </Text>
                <Text component={TextVariants.p}>
                    Enter new Value:
                </Text>
            </TextContent>
            <TextInput
                onChange={(val) => setChipValue(val)}
                placeholder={chipType + '...'}
                value={chipValue}
            />
        </Modal>}
        <Flex breakpointMods={[{modifier: FlexModifiers.column}]} style={{ margin: '10px' }}>
            <Flex>
                <FlexItem>
                    <TextContent>
                        <Text component={TextVariants.h1}>
                            {children}
                        </Text>
                    </TextContent>
                </FlexItem>
                <FlexItem breakpointMods={[{modifier: FlexModifiers["align-right"]}]}>
                    <DropdownContainer
                        items={
                        history.location.pathname === '/payloads' ?
                            PAYLOAD_FILTER_TYPES : STATUS_FILTER_TYPES
                        }
                        type="Add Filter"
                        setSelected={setSelected}
                    />
                </FlexItem>
            </Flex>
            <FlexItem>
                {filters.map(chip =>
                    <Chip key={chip.id} onClick={() => closeChip(chip.id)}>
                        {chip.type + '=' + chip.value}
                    </Chip>
                )}
            </FlexItem>
        </Flex>
    </React.Fragment>;
};

SearchBar.propTypes = {
    children: PropTypes.node,
    filters: PropTypes.array,
    removeStartDate: PropTypes.func,
    removeEndDate: PropTypes.func,
    addFilter: PropTypes.func,
    closeFilterChip: PropTypes.func,
    createFilterChip: PropTypes.func
};

const mapStateToProps = state => ({
    filters: state.payloads.filters
});

const mapDispatchToProps = dispatch => ({
    removeStartDate: () => dispatch(AppActions.removeStartDate),
    removeEndDate: () => dispatch(AppActions.removeEndDate),
    addFilter: (filter, value) => dispatch(AppActions.addFilter(filter, value)),
    closeFilterChip: (id) => dispatch([
      AppActions.removeFilter(id),
      AppActions.removePage(),
      AppActions.setPage(1)
    ]),
    createFilterChip: () => dispatch([
      AppActions.removePage(),
      AppActions.setPage(1)
    ])
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);