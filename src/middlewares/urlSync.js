import * as ConstantTypes from '../AppConstants';

import { contains, getFilterTypes, getObjFromSearch, getSearchFromObj } from '../utilities/Common';

import { replace } from 'connected-react-router';

export default store => next => action => {

    const state = store.getState();
    const { search } = state.router.location;
    const { type } = action;

    const updateSearch = (search) => {
        switch (type) {
            case ConstantTypes.SET_TRACK_REQUEST_ID:
                store.dispatch(replace({
                    pathname: `/app/payload-tracker/track/${action.payload}`
                }));
                return;
            case ConstantTypes.SET_TRACK_SORT_DIR:
                return {
                    ...search,
                    ['sort_dir']: action.payload
                };
            case ConstantTypes.SET_TRACK_SORT_BY:
                return {
                    ...search,
                    ['sort_by']: action.payload
                };
            case ConstantTypes.SET_CELL_ACTIVITY:
                return {
                    ...search,
                    [`${action.title}Cell`]: action.payload ? false : 'false'
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
            case ConstantTypes.SET_SORT_DIR:
                return {
                    ...search,
                    ['sort_dir']: action.payload
                };
            case ConstantTypes.SET_SORT_BY:
                return {
                    ...search,
                    ['sort_by']: action.payload
                };
            case ConstantTypes.UPDATE_FILTERS:
                // first we remove any existing filters from the search object
                // then we add the new, updated filters to the new object to be returned
                return {
                    ...Object.fromEntries(Object.entries(search).filter((i) => {
                        return !contains(getFilterTypes('*'), i[0]) && i[1] && i;
                    })), ...Object.fromEntries(action.payload.flatMap(obj => {
                        return Object.entries(obj).filter(([k, v]) => v && [k, v]);
                    }))
                };
            default:
                return;
        }
    };

    const params = updateSearch(search !== '' ?  getObjFromSearch(search) : {});
    const newSearch = params && getSearchFromObj(params);

    if (newSearch) {
        store.dispatch(replace({
            search: newSearch
        }));
    }

    return next(action);

};
