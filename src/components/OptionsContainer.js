import * as AppActions from '../actions';

import {
    Menu,
    MenuContent,
    MenuList,
    MenuItem,
    MenuToggle,
    Popper
} from '@patternfly/react-core';
import React, { useState, useRef } from 'react';

import PropTypes from 'prop-types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const OptionsContainer = ({ isDisabled }) => {
    const dispatch = useDispatch();
    const cells = useSelector(state => state.cell.cells, shallowEqual);

    const [isOpen, setOpen] = useState(false);
    const toggleRef = useRef(null);
    const menuRef = useRef(null);

    const clickHandler = cell => {
        cell.isActive ?  dispatch(AppActions.setCellActivity(cell.title, false)) :  dispatch(AppActions.setCellActivity(cell.title, true));
    };

    const generateOptions = () => {
        let options = [];
        Object.entries(cells).forEach(([key, cell]) => {
            if (cell.title !== 'id') {
                options.push(
                    <MenuItem
                        itemId={cell.title}
                        onClick={() => clickHandler(cell)}
                        isSelected={cell.isActive}
                        key={key}
                    >
                        {cell.title}
                    </MenuItem>
                );
            }
        });
        return (options);
    };

    const toggle = (
        <MenuToggle
            ref={toggleRef}
            onClick={() => setOpen(!isOpen)}
            isExpanded={isOpen}
            isDisabled={isDisabled}
        >
            Show Columns
        </MenuToggle>
    );

    const menu = (
        <Menu ref={menuRef} onSelect={() => setOpen(false)}>
            <MenuContent>
                <MenuList>
                    {generateOptions()}
                </MenuList>
            </MenuContent>
        </Menu>
    );

    return <Popper
        trigger={toggle}
        popper={menu}
        isVisible={isOpen}
        popperMatchesTriggerWidth={false}
    />;
};

OptionsContainer.propTypes = {
    isDisabled: PropTypes.bool
};

export default OptionsContainer;
