import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import DateTime from 'luxon/src/datetime';
import PropTypes from 'prop-types';
import { TextInput } from '@patternfly/react-core';

const DateTextInput = forwardRef(({ val, setValidation }, ref) => {

    const [isValid, setTextValidation] = useState(false);
    const [currentValue, setCurrentValue] = useState();

    const updateState = (validation) => {
        setTextValidation(validation);
        setValidation(validation);
    };

    const checkVal = (newVal) => {
        if (newVal) {
            newVal = newVal instanceof Object ? newVal.toLocaleString('en-US') : newVal
            const res = DateTime.fromFormat(newVal, 'm/d/y, h:mm:ss a');
            res.invalid ? updateState(false) : updateState(true);
            setCurrentValue(newVal);
        }
    };

    useEffect(() => {
        checkVal(val);
        setCurrentValue(val);
    //eslint-disable-next-line
    }, [val, setCurrentValue]);

    useImperativeHandle(ref, () => ({
        setValue: (value) => {
            checkVal(value);
            setCurrentValue(value);
        },
        getValue: () => {
            return new Date(currentValue);
        }
    }));

    return <TextInput
        value={currentValue && currentValue.toLocaleString('en-US')}
        onChange={(val) => checkVal(val)}
        validated={isValid ? 'success' : 'error'}
    />;
});

DateTextInput.propTypes = {
    setVal: PropTypes.func,
    setValidation: PropTypes.func,
    val: PropTypes.any
};

export default DateTextInput;
