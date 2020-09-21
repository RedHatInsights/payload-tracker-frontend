import { getLocalDate } from '../../AppConstants';

const subtractMinutes = (minutes, dateObj = new Date()) => new Date(dateObj.getTime() - minutes * 60000);

export const compareDates = (a, b) => getLocalDate(a) === getLocalDate(b);

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

export const isQuickFilter = (curr, s, e) => {
    const filters = curr.filter(({ title, start, end }) => compareDates(start, s) && compareDates(end, e) && title);
    return filters?.[0]?.title;
};
