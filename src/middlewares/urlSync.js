import * as ConstantTypes from '../AppConstants';

import { replace } from 'connected-react-router';

const filterTypes = [...ConstantTypes.PAYLOAD_FILTER_TYPES, ...ConstantTypes.STATUS_FILTER_TYPES];

export default store => next => action => {

    const state = store.getState();
    const { search } = state.router.location;
    const { type } = action;

    const contains = (arr, n) => arr.filter(v => v === n).length > 0;

    const updateSearch = (search) => {
        switch (type) {
            case ConstantTypes.SET_TRACK_REQUEST_ID:
                store.dispatch(replace({
                    pathname: `/track/${action.payload}`
                }));
                return;
            case ConstantTypes.SET_CELL_ACTIVITY:
                return {
                    ...search,
                    [`${action.title}Cell`]: action.payload ? false : 'inactive'
                };
            case ConstantTypes.SET_START_DATE:
                return {
                    ...search,
                    ['start_date']: action.payload || false
                };
            case ConstantTypes.SET_END_DATE:
                return {
                    ...search,
                    ['end_date']: action.payload || false
                };
            case ConstantTypes.SET_PAGE:
                return {
                    ...search,
                    ['page']: action.payload
                };
            case ConstantTypes.SET_PAGE_SIZE:
                return {
                    ...search,
                    ['page_size']: action.payload
                };
            case ConstantTypes.UPDATE_FILTERS:
                // first we remove any existing filters from the search object
                // then we add the new, updated filters to the new object to be returned
                return {
                    ...Object.fromEntries(Object.entries(search).filter((i) => {
                        return !contains(filterTypes, i[0]) && i[1] && i;
                    })), ...Object.fromEntries(action.payload.flatMap(obj => {
                        return Object.entries(obj).filter(([k, v]) => v && [k, v]);
                    }))
                };
            default:
                return;
        }
    };

    const params = updateSearch(
        search !== '' ?  Object.fromEntries(search.slice(1).split('&').map(i => i.split('='))) : {}
    );

    const newSearch = params && `?${Object.entries(params).reduce((acc, i) => {
        return i[1] ? [...acc, `${i[0]}=${i[1]}`] : acc;
    }, []).join('&')}`;

    if (newSearch) {
        store.dispatch(replace({
            search: newSearch
        }));
    }

    console.error(action);
    return next(action);

};
