import {
  UPDATE_USER,
  UPDATE_USER_SETTINGS,
  ADD_PLANT,
  REMOVE_PLANT,
} from './types';

import Toast from '../utils/toast';
import appColors from '../utils/appColors';

// import plants from '../assets/data/plants.json';
import recipes from '../assets/data/recipes.json';

const initState = {
  user: {},
  plants: [],
  recipes: recipes,
  address: '',
};

const rootReducer = (state = initState, action) => {
  console.log(action.type);
  switch (action.type) {
    case UPDATE_USER:
      return {...state, user: action.user};
    case UPDATE_USER_SETTINGS:
      console.log(action.settings);
      return {...state, settings: action.settings};
    case ADD_PLANT:
      let plants_added = state.plants;
      plants_added.push(action.plant);
      Toast('Added to Garden', appColors.success, 3000, 'Garden');
      return {...state, plants: plants_added};
    case REMOVE_PLANT:
      let plants_removed = state.plants.filter(
        plant => plant.scientificName !== action.plant.scientificName,
      );
      Toast('Removed from Garden', appColors.failure, 3000);
      return {...state, plants: plants_removed};
    default:
      return state;
  }
};

export default rootReducer;
