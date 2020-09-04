import './Chips.scss'

import { Chip, ChipGroup } from '@patternfly/react-core';
import React, { useEffect, useState } from 'react';
import { stageFilters, unstageFilter } from '../../actions';

import PropTypes from 'prop-types';
import { TYPES } from './Constants';
import { connect } from 'react-redux';

const Chips = ({ toDelete, staged, currFilters, onRevoke, onDelete, displayChip }) => {
    const [chips, setChips] = useState([]);

    useEffect(() => {
        setChips({
            [TYPES.FILTER]: currFilters,
            [TYPES.STAGE]: staged,
            [TYPES.DELETE]: toDelete
        });
    }, [toDelete, staged, currFilters]);

    return <div className='pt-c-toolbar--chips'>
        {Object.entries(chips).map(([type, chipArr], group) => {
            return chipArr.length > 0 && <ChipGroup key={group} categoryName={type}>
            {type === TYPES.DELETE ?
                chipArr.map((chip, index) => <Chip
                    key={`${group}.${index}`}
                    onClick={() => onRevoke(chip)}
                >{displayChip(chip)}</Chip>) :
                chipArr.map((chip, index) => <Chip
                    key={`${group}.${index}`}
                    onClick={() => onDelete(chip, type)}
                >{displayChip(chip)}</Chip>)}
        </ChipGroup>})}
    </div>;

};

Chips.propTypes = {
    staged: PropTypes.array,
    filters: PropTypes.array,
    stageFilters: PropTypes.func,
    unstageFilter: PropTypes.func
};

const mapStateToProps = (state) => ({
    filters: state.payloads.filters,
    staged: state.payloads.staged
});

const mapDispatchToProps = (dispatch) => ({
    stageFilters: (filters) => dispatch(stageFilters(filters)),
    unstageFilter: (filter) => dispatch(unstageFilter(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chips);
