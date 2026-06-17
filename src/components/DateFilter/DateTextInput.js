import { forwardRef, useEffect, useImperativeHandle, useState, useCallback } from 'react';

import DateTime from 'luxon/src/datetime';
import PropTypes from 'prop-types';
import { TextInput } from '@patternfly/react-core';

const DateTextInput = forwardRef(({ val, setValidation }, ref) => {

    const [isValid, setTextValidation] = useState(false);
    const [currentValue, setCurrentValue] = useState();
    const [displayValue, setDisplayValue] = useState('');

    const updateState = useCallback((validation) => {
        setTextValidation(validation);
        setValidation(validation);
    }, [setValidation]);

    const validateAndSetValue = useCallback((newVal) => {
        if (!newVal) {
            return;
        }

        if (newVal instanceof Date) {
            setCurrentValue(newVal);
            setDisplayValue(newVal.toLocaleString('en-US'));
            updateState(true);
            return;
        }

        const res = DateTime.fromFormat(newVal, 'm/d/y, h:mm:ss a');
        if (!res.invalid) {
            setCurrentValue(res.toJSDate());
            setDisplayValue(newVal);
            updateState(true);
        } else {
            setDisplayValue(newVal);
            updateState(false);
        }
    }, [updateState]);

    useEffect(() => {
        if (val) {
            validateAndSetValue(val);
        } else {
            setCurrentValue(undefined);
            setDisplayValue('');
            updateState(false);
        }
    }, [val, validateAndSetValue, updateState]);

    useImperativeHandle(ref, () => ({
        setValue: (value) => {
            validateAndSetValue(value);
        },
        getValue: () => {
            if (currentValue instanceof Date) {
                return currentValue;
            }

            const parsed = DateTime.fromFormat(displayValue, 'm/d/y, h:mm:ss a');
            return !parsed.invalid ? parsed.toJSDate() : null;
        }
    }), [validateAndSetValue, currentValue, displayValue]);

    return <TextInput
        value={displayValue}
        onChange={(_event, val) => validateAndSetValue(val)}
        validated={isValid ? 'success' : 'error'}
    />;
});

DateTextInput.displayName = 'DateTextInput';

DateTextInput.propTypes = {
    setVal: PropTypes.func,
    setValidation: PropTypes.func,
    val: PropTypes.any
};

export default DateTextInput;
