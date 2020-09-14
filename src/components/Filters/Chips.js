import './Chips.scss';

import { Chip, ChipGroup } from '@patternfly/react-core';
import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { TYPES } from './Constants';

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
                    chipArr.map((chip, index) => {
                        return <Chip
                            key={`${group}.${index}`}
                            onClick={() => onRevoke(chip)}
                        >{displayChip(chip)}</Chip>;
                    }) : chipArr.map((chip, index) => {
                        return <Chip
                            key={`${group}.${index}`}
                            onClick={() => onDelete(chip, type)}
                        >{displayChip(chip)}</Chip>;
                    })}
            </ChipGroup>;})}
    </div>;
};

Chips.propTypes = {
    toDelete: PropTypes.array,
    staged: PropTypes.array,
    currFilters: PropTypes.array,
    onRevoke: PropTypes.func,
    onDelete: PropTypes.func,
    displayChip: PropTypes.func
};

export default Chips;
