import * as AppActions from '../actions';

import {
    OptionsMenu,
    OptionsMenuItem,
    OptionsMenuPosition,
    OptionsMenuToggle
} from '@patternfly/react-core';
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const OptionsContainer = ({ isDisabled }) => {
    const dispatch = useDispatch();
    const cells = useSelector(state => state.cell.cells, shallowEqual);

    const [isOpen, setOpen] = useState(false);

    const clickHandler = cell => {
        cell.isActive ?  dispatch(AppActions.setCellActivity(cell.title, false)) :  dispatch(AppActions.setCellActivity(cell.title, true));
    };

    const generateOptions = () => {
        let options = [];
        Object.entries(cells).forEach(([key, cell]) => {
            if (cell.title !== 'id') {
                options.push(
                    <OptionsMenuItem
                        onSelect={() => clickHandler(cell)}
                        isSelected={cell.isActive}
                        id={cell.title}
                        key={key}
                    >
                        {cell.title}
                    </OptionsMenuItem>
                );
            }
        });
        return (options);
    };

    return <OptionsMenu
        id="options-menu-align-right-example"
        position={OptionsMenuPosition.right}
        menuItems={generateOptions()}
        toggle={<OptionsMenuToggle
            onToggle={() => setOpen(!isOpen)}
            toggleTemplate={<React.Fragment>Show Columns</React.Fragment>}
        />}
        isOpen={isOpen}
        isDisabled={isDisabled}
    />;
};

OptionsContainer.propTypes = {
    isDisabled: PropTypes.bool
};

export default OptionsContainer;
