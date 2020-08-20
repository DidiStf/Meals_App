const ACTION_KEY = 'meals';

export const TOGGLE_FAVOURITE_MEAL = `${ACTION_KEY}/toggleFavoutiteMeal`;
export const SET_FILTERS = `${ACTION_KEY}/setFilters`;

export const toggleFavouriteMealAction = (id) => {
  return {
    type: TOGGLE_FAVOURITE_MEAL,
    payload: {
      mealId: id,
    },
  };
};

export const setFiltersAction = (filterSettings) => {
  return {
    type: SET_FILTERS,
    payload: {
      filters: filterSettings,
    },
  };
};
