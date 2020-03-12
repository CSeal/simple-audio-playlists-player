// Core
import { combineReducers } from 'redux';
// Reducers

import {mainReducer} from '../../core/main/reducer'
import {trackManagerReducer} from '../../core/trackManager/reducer'

const rootReducer = combineReducers({
  main: mainReducer,
  trackManager: trackManagerReducer
});

export { rootReducer };