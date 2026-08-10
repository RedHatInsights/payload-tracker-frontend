import * as ConstantTypes from '../AppConstants';

import history from '../history';
import { useEffect } from 'react';

export const contains = (arr, n) => arr.filter(v => v === n).length > 0;

export const truncateString = (string, chars) => string.length > chars ? string.substring(0, chars) + '...' : string;

export const getObjFromSearch = (search) => {
    return Object.fromEntries(search.slice(1).split('&').map(item => item.split('=')));
};

export const getSearchFromObj = (obj) => {
    return `?${Object.entries(obj).reduce((acc, i) => {
        return i[1] ? [...acc, `${i[0]}=${i[1]}`] : acc;
    }, []).join('&')}`;
};

export const getFilterTypes = (pathname) => {
    if (pathname === '*') {
        return [...ConstantTypes.PAYLOAD_FILTER_TYPES, ...ConstantTypes.STATUS_FILTER_TYPES];
    } else if (pathname === '/app/payload-tracker/payloads') {
        return ConstantTypes.PAYLOAD_FILTER_TYPES;
    } else if (pathname === '/app/payload-tracker/statuses') {
        return ConstantTypes.STATUS_FILTER_TYPES;
    } else {
        return [];
    }
};

export const getLocalDate = (date) => {
    return date ? `${date.toLocaleString('en-US')} UTC-${date.getTimezoneOffset() / 60}00` : null;
};

export const getValueFromURL = (location, prop) => {
    const { pathname, search } = location;
    if (history.location.pathname === pathname) {
        const value = getObjFromSearch(search)?.[prop];
        return value || null;
    } else { return null; }
};

export const usePolling = (callback, delay) => {
    useEffect(() => {
        if (delay) {
            const id = setInterval(callback, delay);
            return () => clearInterval(id);
        }
    }, [callback, delay]);
};

export const validUUID = (str) => {
    const uuidStr = '' + str;

    const uuidMatch = uuidStr.match('^[0-9a-fA-F]{32}$');
    if (uuidMatch === null) {
        return false;
    }

    return true;
};

/**
 * Sanitize a string value for safe CSV export by neutralizing
 * spreadsheet formula injection. Values starting with formula
 * trigger characters (=, +, -, @, TAB, CR) are prefixed with
 * a single quote so spreadsheets treat them as literal text.
 */
const FORMULA_TRIGGER_RE = /^[=+\-@\t\r]/;

export const sanitizeCsvValue = (value) => {
    if (typeof value !== 'string') {
        return value;
    }

    return FORMULA_TRIGGER_RE.test(value) ? `'${value}` : value;
};

/**
 * Sanitize an array of objects for safe CSV export.
 * Each string property value is checked for formula triggers.
 */
export const sanitizeCsvData = (data) => {
    if (!Array.isArray(data)) {
        return data;
    }

    return data.map((row) => {
        const sanitized = {};
        for (const [key, value] of Object.entries(row)) {
            sanitized[key] = sanitizeCsvValue(value);
        }

        return sanitized;
    });
};
