import './Chips.scss';

import { Label, LabelGroup } from '@patternfly/react-core';
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
            return chipArr.length > 0 && <LabelGroup key={group} categoryName={type}>
                {type === TYPES.DELETE ?
                    chipArr.map((chip, index) => {
                        const chipText = displayChip(chip);
                        return <Label variant="outline"
                            key={`${group}.${index}`}
                            onClose={() => onRevoke(chip)}
                        >{String(chipText)}</Label>;
                    }) : chipArr.map((chip, index) => {
                        const chipText = displayChip(chip);
                        return <Label variant="outline"
                            key={`${group}.${index}`}
                            onClose={() => onDelete(chip, type)}
                        >{String(chipText)}</Label>;
                    })}
            </LabelGroup>;})}
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
