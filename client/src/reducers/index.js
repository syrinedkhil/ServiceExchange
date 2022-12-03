import { combineReducers } from 'redux';
import ads from './ads-reducers';
import user from './user-reducers';
import comments from './comment-reducers'
const rootReducer = combineReducers({
    ads,
    user,
    comments

});

export default rootReducer;