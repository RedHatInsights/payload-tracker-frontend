import './FilterToolbar.scss';

import { Button, Divider, Select, SelectOption } from '@patternfly/react-core';
import React, { useEffect, useState } from 'react';
import { stageFilters, unstageFilter, updateFilters } from '../../actions';

import Chips from './Chips';
import FilterModal from './FilterModal';
import PropTypes from 'prop-types';
import { TYPES } from './Constants';
import { connect } from 'react-redux';

const FilterToolbar = ({ options, filters, staged, stageFilters, unstageFilter, updateFilters }) => {
    const [currFilters, setFilters] = useState([]);
    const [toDelete, setDelete] = useState([]);
    const [selected, setSelected] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    const stringify = (filter) => {
        return Object.entries(filter).map(([key, value]) => `${key}=${value}`)[0];
    }

    const removeFilter = (arr, toRemove) => {
        return arr.filter(item => stringify(item) !== stringify(toRemove));
    }

    const onToggleFn = (isOpen) => { setIsOpen(isOpen); !isModalOpen && setSelected([]); }

    const onSelectFn = (e, selection) => {
        selected.filter(item => item === selection).length > 0 ?
            setSelected(selected.filter(item => item !== selection)) :
            setSelected([...selected, selection]);
    };

    const onCancelFn = () => { setModalOpen(false); onToggleFn(); };

    const onDeleteFn = (chip, type) => {
        type === TYPES.STAGE ?
            unstageFilter(chip) : (
                setFilters(removeFilter(currFilters, chip)),
                setDelete([...toDelete, chip])
            );
    };

    const onRevokeFn = (filter) => {
        setDelete(removeFilter(toDelete, filter));
        setFilters([...currFilters, filter]);
    };

    const onStageFn = (filters) => {
        stageFilters(filters);
        setModalOpen(false);
        onToggleFn();
    };

    const onApplyFn = () => {
        updateFilters([...currFilters, ...staged]);
        setDelete([]);
    };

    useEffect(() => {
        setFilters(filters);
    }, [filters]);

    return <div className='pt-c-toolbar'>
        {isModalOpen && <FilterModal
            isOpen={isModalOpen}
            options={selected}
            onStageFn={onStageFn}
            onCancelFn={onCancelFn}
        />}
        <Select
            className='pt-c-toolbar__selector'
            variant='checkbox'
            selections={selected}
            isPlain
            onToggle={onToggleFn}
            onSelect={onSelectFn}
            isOpen={isOpen}
            placeholderText='Add Filters'
            isCheckboxSelectionBadgeHidden
        >
            {options.map((option, key) => <SelectOption key={key} value={option}/>)}
            <Divider/>
            <Button variant='link' isDisabled={selected.length === 0} onClick={() => setModalOpen(true)}>
                Enter Filter Values
            </Button>
        </Select>
        <Chips toDelete={toDelete} staged={staged} currFilters={currFilters}
            onRevoke={onRevokeFn} onDelete={onDeleteFn} displayChip={stringify}/>
        <Button className='pt-c-toolbar__apply' variant='link' onClick={onApplyFn}> Apply </Button>
    </div>;

};

FilterToolbar.propTypes = {
    options: PropTypes.array,
    filters: PropTypes.array,
    staged: PropTypes.array,
    stageFilters: PropTypes.func,
    unstageFilter: PropTypes.func
};

const mapStateToProps = (state) => ({
    filters: state.payloads.filters,
    staged: state.payloads.staged
});

const mapDispatchToProps = (dispatch) => ({
    stageFilters: (filters) => dispatch(stageFilters(filters)),
    unstageFilter: (filter) => dispatch(unstageFilter(filter)),
    updateFilters: (filters) => dispatch(updateFilters(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterToolbar);