import {combineReducers} from 'redux';
import getData from './getData';



const allReducers= combineReducers({
    getData: getData,
});
export default allReducers;
