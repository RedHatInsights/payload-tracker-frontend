import { useCallback, useEffect, useRef, useState } from 'react';

import { getLocalDate } from '../../utilities/Common';

const compareDates = (a, b) => getLocalDate(a) === getLocalDate(b);

const subtractMinutes = (minutes, dateObj = new Date()) => new Date(dateObj.getTime() - minutes * 60000);

export const quickFilters = () => ([
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

export const useQuickFilters = (defaultValue, callbackFn) => {
    const [filters, setFilters] = useState(defaultValue);
    const [lastClicked, setLastClicked] = useState();
    const filterRef = useRef();

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

    return { filters, getFilterTitle, updateFilters };
};

export const useStacks = (defaultValue = null) => {
    const [data, setData] = useState([]);
    const [active, setActive] = useState();
    const [leftStack, setLeftStack] = useState([]);
    const [rightStack, setRightStack] = useState([]);

    const updateData = (start, end) => setData([{ start, end }, ...data]);

    const toggleLeft = () => {
        const [{ start, end }, ...more] = leftStack;
        setLeftStack(more);
        setRightStack([active, ...rightStack]);
        setActive({ start, end });
    };

    const toggleRight = () => {
        const [{ start, end }, ...more] = rightStack;
        setRightStack(more);
        setLeftStack([active, ...leftStack]);
        setActive({ start, end });
    };

    useEffect(() => {
        const [recent, ...more] = data;
        setLeftStack([]);
        setRightStack(more);
        setActive(recent);
    //eslint-disable-next-line
    }, [data]);

    useEffect(() => {
        if (defaultValue?.start && defaultValue?.end) {
            setData([{ start: defaultValue.start, end: defaultValue.end }]);
            setActive([{ start: defaultValue.start, end: defaultValue.end }]);
        }
    //eslint-disable-next-line
    }, []);

    return { active, leftStack, toggleLeft, rightStack, toggleRight, updateData };
};
