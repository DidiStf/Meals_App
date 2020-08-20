import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVOURITE_MEAL, SET_FILTERS } from '../actions/meals';

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favouriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVOURITE_MEAL:
      if (
        state.favouriteMeals.find((meal) => meal.id === action.payload.mealId)
      ) {
        return {
          ...state,
          favouriteMeals: state.favouriteMeals.filter(
            (meal) => meal.id !== action.payload.mealId
          ),
        };
      } else {
        return {
          ...state,
          favouriteMeals: state.favouriteMeals.concat(
            state.meals.find((meal) => meal.id === action.payload.mealId)
          ),
        };
      }
    case SET_FILTERS:
      const appliedfilters = action.payload.filters;
      const { glutenFree, lactoseFree, vegan, vegetarian } = appliedfilters;
      const filteredMeals = state.meals.filter(
        ({ isGlutenFree, isLactoseFree, isVegan, isVegetarian }) => {
          if (
            (glutenFree && !isGlutenFree) ||
            (lactoseFree && !isLactoseFree) ||
            (vegan && !isVegan) ||
            (vegetarian && !isVegetarian)
          ) {
            return false;
          }
          return true;
        }
      );
      return { ...state, filteredMeals };
    default:
      return state;
  }
  return state;
};

export default mealsReducer;
