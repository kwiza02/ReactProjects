
//import {Constants} from "../RestAPI/Constants";

import {Constants} from "../RestAPI/Constants";

export default function(state= {}, action){
  switch (action.type) {
    case Constants.KEY_TYPE_CATEGORY_SELECT_DATA:
        return { ...state, categoryObject: action.data
    }
    case Constants.KEY_TYPE_SUBCATEGORY_SELECT_DATA:
        return { ...state, subcategoryObject:action.data
    }
    default: {
      return state
   }
  }
}
