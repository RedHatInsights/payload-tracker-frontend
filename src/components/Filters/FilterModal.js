import { Button, Form, FormGroup, Modal, TextInput } from '@patternfly/react-core';
import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

const FilterModal = ({ isOpen, options, onStageFn, onCancelFn }) => {

    const [toStage, setToStage] = useState([]);
    const [canStage, setCanStage] = useState(false);

    const preprocess = (filters) => {
        return filters.map(item => Object.entries(item).map(([key, value]) => `${key}=${value}`));
    };

    const updateValue = (value, option) => {
        setToStage(toStage.flatMap(item => Object.keys(item).map(key => key === option ? { [key]: value } : item)));
    };

    useEffect(() => {
        setToStage(options.map(option => ({ [option]: '' })));
    }, [options]);

    useEffect(() => {
        toStage.flatMap(item => Object.values(item).filter(value => value === '')).length > 0 ?
            setCanStage(false) :
            setCanStage(true);
    }, [toStage]);

    return <Modal
        title='Stage Filters'
        variant='small'
        isOpen={isOpen}
        onClose={onCancelFn}
        actions={[
            <Button
                key="confirm" variant="primary" isDisabled={!canStage}
                onClick={() => toStage && onStageFn(toStage)}>
                Stage
            </Button>,
            <Button key="cancel" variant="link" onClick={onCancelFn}>
                Cancel
            </Button>
        ]}
    >
        {toStage.length === options.length && <Form isHorizontal>
            {options.map((option, index) => <FormGroup label={option} isRequired>
                <TextInput
                    value={toStage[index].option}
                    type='text'
                    onChange={(value) => updateValue(value, option)}
                />
            </FormGroup>)}
        </Form>}
    </Modal>
};

FilterModal.propTypes ={
    isOpen: PropTypes.bool,
    options: PropTypes.array,
    onCancelFn: PropTypes.func
};

export default FilterModal;
