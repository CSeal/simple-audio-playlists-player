import {TInitialState, TAction} from './types';
import * as constants from './constants'

const initialState: TInitialState = {
  data: [],
  loading: false,
  errors: null,
};

export const mainReducer = function(state: TInitialState = initialState, action: TAction): TInitialState  {
  const {type, payload} = action;

  switch(type) {
    case constants.LOADING_INIT_DATA: {
      return {
        ...initialState,
        loading: true
      }
    }
    case constants.INIT_DATA_LOADED_SUCCESS: {
      return {
        data: payload,
        loading: false,
        errors: null
      }
    }
    case constants.INIT_DATA_LOADED_FAILURE: {
      return {
        ...state,
        loading: false,
        errors: payload
      }
    }
    default:
      return state;
  }
}