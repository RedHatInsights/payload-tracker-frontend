import { replace } from 'connected-react-router';

export default store => next => action => {
  const state = store.getState();
  var newSearch = '';

  /* Data which is added to the URL is found in the following places:
      (1) state.router.location.query
      (2) state.cell.cells
      (3) state.payloads.filters
    (1) and (3) change in size, (2) resets a boolean based on activity,
      and maintains a set size proportional to number of columns.
  */
  const { query } = state.router.location;
  const { cells } = state.cell
  const { filters } = state.payloads;

  /* Adds data to url of the following type:
  * {type: filter} */
  if (action.pushToUrl) {

    if (query) {
      Object.entries(query).forEach(([type, filter]) => {
        newSearch += `${type}=${filter}&`
      })
    }

    if (filters) {
      filters.map((filter) => 
        newSearch += `${filter.type}=${filter.value}&`
      )
    };

    if (cells) {
      for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];
        if(!cell.isActive) {
          newSearch += `${cell.title}Cell=inactive&`
        }
      }
    }

    const [type, filter] = Object.entries(action.pushToUrl)[0];
    newSearch += `${type}=${filter}&`

    store.dispatch(replace({
      search: newSearch,
      query: {
        ...query,
        ...action.pushToUrl
      }
    }));
  }

  /* Removes data from url of the following type:
  * {type: filter} */
  if(action.removeFromUrl) {
    var newQuery = query;

    if (query) {
      newQuery = Object.keys(query).reduce((object, key) => {
        if (key !== action.removeFromUrl.type) {
          object[key] = query[key]
        }
        return object
      }, {});
  
      Object.entries(newQuery).forEach(([type, value]) => {
        newSearch += `${type}=${value}&`
      })

      if (filters) {
        filters.map((filter) => 
          newSearch += `${filter.type}=${filter.value}&`
        )
      };

      if (cells) {
        for (i = 0; i < cells.length; i++) {
          cell = cells[i];
          if(!cell.isActive) {
            newSearch += `${cell.title}Cell=inactive&`
          }
        }
      }

    }

    store.dispatch(replace({
      search: newSearch,
      query: newQuery,
    }));
  }

  /* Adds data to url of the following type:
  * {id: {id}, type: {type}, value: {filter}} */
  if(action.pushVariableDataToUrl) {

    if (query) {
      Object.entries(query).forEach(([type, value]) => {
        newSearch += `${type}=${value}&`
      })
    };
    
    if (filters) {
      filters.map((filter) => 
        newSearch += `${filter.type}=${filter.value}&`
      )
    };

    if (cells) {
      for (i = 0; i < cells.length; i++) {
        cell = cells[i];
        if(!cell.isActive) {
          newSearch += `${cell.title}Cell=inactive&`
        }
      }
    }

    newSearch += `${action.pushVariableDataToUrl.type}=${action.pushVariableDataToUrl.value}&`

    store.dispatch(replace({
      search: newSearch,
      query: {
        ...query
      }
    }));
  }

  /* Removes data to url of the following type:
  * {id: {id}, type: {type}, value: {filter}} */
  if(action.removeVariableDataFromUrl) {

    if (query) {
      Object.entries(query).forEach(([type, value]) => {
        newSearch += `${type}=${value}&`
      })
    };
    
    if (filters) {
      var newFilters = filters.reduce((array, filter) => {
        if (filter.id !== action.removeVariableDataFromUrl.id) {
          array.push(filter);
        }
        return array;
      }, []);

      newFilters.map((filter) => 
        newSearch += `${filter.type}=${filter.value}&`
      );
    };

    if (cells) {
      for (i = 0; i < cells.length; i++) {
        cell = cells[i];
        if(!cell.isActive && cell.title !== action.removeVariableDataFromUrl.id) {
          newSearch += `${cell.title}Cell=inactive&`
        }
      }
    }

    store.dispatch(replace({
      search: newSearch,
      query: {
        ...query
      }
    }));
  }

  return next(action);
}