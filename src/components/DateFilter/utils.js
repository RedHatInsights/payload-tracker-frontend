import { useCallback, useEffect, useRef, useState } from 'react';

import { getLocalDate } from '../../AppConstants';

const compareDates = (a, b) => getLocalDate(a) === getLocalDate(b);

const subtractMinutes = (minutes, dateObj = new Date()) => new Date(dateObj.getTime() - minutes * 60000);

const quickFilters = () => ([
    {
        title: '15 minutes',
        start: subtractMinutes(15),
        end: new Date()
    },
    {
        title: '1 hour',
        start: subtractMinutes(60),
        end: new Date()
    },
    {
        title: '3 hours',
        start: subtractMinutes(180),
        end: new Date()
    },
    {
        title: '6 hours',
        start: subtractMinutes(360),
        end: new Date()
    },
    {
        title: '12 hours',
        start: subtractMinutes(720),
        end: new Date()
    },
    {
        title: '24 hours',
        start: subtractMinutes(1440),
        end: new Date()
    },
    {
        title: '2 days',
        start: subtractMinutes(2880),
        end: new Date()
    },
    {
        title: 'All Time',
        start: undefined,
        end: undefined
    }
]);

export const useQuickFilters = (callbackFn) => {
    const [filters, setFilters] = useState(quickFilters());
    const [lastClicked, setLastClicked] = useState();
    const filterRef = useRef();

    const getFilterFromTitle = (value) => filters.filter(({ title, start, end }) => {
        return value === title && ({ start, end });
    })?.[0];

    const getFilterTitle = (s, e) => filters.filter(({ title, start, end }) => {
        return compareDates(start, s) && compareDates(end, e) && title;
    })?.[0]?.title;

    const updateFilters = (type) => { setFilters(quickFilters()); setLastClicked(type); };

    const callback = useCallback(() => callbackFn(lastClicked), [callbackFn, lastClicked]);

    useEffect(() => {
        if (JSON.stringify(filterRef.current) !== JSON.stringify(filters)) {
            callback();
            filterRef.current = filters;
        }
    }, [callback, filters, filterRef]);

    return { filters, getFilterTitle, getFilterFromTitle, updateFilters };
};
