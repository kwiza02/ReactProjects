//import {Constants} from "../RestAPI/Constants";
import {Constants} from "../RestAPI/Constants";

export function setSelectedCategory(categoryData){
  return{
    type: Constants.KEY_TYPE_CATEGORY_SELECT_DATA,
    data: categoryData,
  };
}

export function setSelectedSubCategory(subcategoryData){
  return{
    type: Constants.KEY_TYPE_SUBCATEGORY_SELECT_DATA,
    data: subcategoryData,
  };
}
