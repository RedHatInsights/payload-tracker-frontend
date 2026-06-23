import './FilterToolbar.scss';

import {
    Button, Divider, MenuToggle, Select, SelectOption, SelectList,
    Toolbar, ToolbarContent, ToolbarItem, ToolbarGroup
} from '@patternfly/react-core';
import React, { useEffect, useState } from 'react';
import { stageFilters, unstageFilter, updateFilters } from '../../actions';

import Chips from './Chips';
import FilterModal from './FilterModal';
import PropTypes from 'prop-types';
import { TYPES } from './Constants';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const FilterToolbar = ({ options }) => {
    const filters = useSelector(state => state.payloads.filters, shallowEqual);
    const staged = useSelector(state => state.payloads.staged, shallowEqual);
    const dispatch = useDispatch();

    const [currFilters, setFilters] = useState([]);
    const [toDelete, setDelete] = useState([]);
    const [selected, setSelected] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    const stringify = (filter) => {
        return Object.entries(filter).map(([key, value]) => `${key}=${value}`)[0];
    };

    const removeFilter = (arr, toRemove) => {
        return arr.filter(item => stringify(item) !== stringify(toRemove));
    };

    const onToggleFn = () => {
        setIsOpen(!isOpen);
        !isModalOpen && !isOpen && setSelected([]);
    };

    const onSelectFn = (e, selection) => {
        if (selection === undefined) {return;} // Ignore clicks on divider/button

        selected.filter(item => item === selection).length > 0 ?
            setSelected(selected.filter(item => item !== selection)) :
            setSelected([...selected, selection]);
    };

    const onCancelFn = () => { setModalOpen(false); onToggleFn(); };

    const onDeleteFn = (chip, type) => {
        type === TYPES.STAGE ?
            dispatch(unstageFilter(chip)) : (
                setFilters(removeFilter(currFilters, chip)),
                setDelete([...toDelete, chip])
            );
    };

    const onRevokeFn = (filter) => {
        setDelete(removeFilter(toDelete, filter));
        setFilters([...currFilters, filter]);
    };

    const onStageFn = (filters) => {
        dispatch(stageFilters(filters));
        setModalOpen(false);
        onToggleFn();
    };

    const onApplyFn = () => {
        dispatch(updateFilters([...currFilters, ...staged]));
        setDelete([]);
    };

    useEffect(() => {
        setFilters(filters);
    }, [filters]);

    return <>
        {isModalOpen && <FilterModal
            isOpen={isModalOpen}
            options={selected}
            onStageFn={onStageFn}
            onCancelFn={onCancelFn}
        />}
        <Toolbar className="pt-c-filter-toolbar">
            <ToolbarContent>
                <ToolbarItem>
                    <Select
                        role="menu"
                        isOpen={isOpen}
                        onOpenChange={onToggleFn}
                        onSelect={onSelectFn}
                        selected={selected}
                        toggle={(toggleRef) => (
                            <MenuToggle
                                ref={toggleRef}
                                onClick={onToggleFn}
                                isExpanded={isOpen}
                                variant="plainText"
                            >
                                Add Filters
                            </MenuToggle>
                        )}
                    >
                        <SelectList>
                            {options.map((option, key) => (
                                <SelectOption
                                    key={key}
                                    value={option}
                                    hasCheckbox
                                    isSelected={selected.includes(option)}
                                >
                                    {option}
                                </SelectOption>
                            ))}
                        </SelectList>
                        <Divider/>
                        <Button variant='link' isDisabled={selected.length === 0} onClick={() => setModalOpen(true)}>
                            Enter Filter Values
                        </Button>
                    </Select>
                </ToolbarItem>
                <ToolbarGroup>
                    <ToolbarItem>
                        <Chips toDelete={toDelete} staged={staged} currFilters={currFilters}
                            onRevoke={onRevokeFn} onDelete={onDeleteFn} displayChip={stringify}/>
                    </ToolbarItem>
                </ToolbarGroup>
                <ToolbarItem align={{ default: 'alignEnd' }}>
                    <Button variant='link' onClick={onApplyFn}>Apply</Button>
                </ToolbarItem>
            </ToolbarContent>
        </Toolbar>
    </>;

};

FilterToolbar.propTypes = {
    options: PropTypes.array
};

export default FilterToolbar;
