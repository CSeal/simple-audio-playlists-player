import {TInitialState, TAction} from './types';
import * as constants from './constants'

const initialState = {
  playingTrackId: null
}

export const trackManagerReducer = function(state: TInitialState = initialState, action: TAction): TInitialState  {
  const {type, payload} = action;

  switch(type) {
    case constants.SET_PLAYING_TRACK: {
      return {
        playingTrackId: payload,
      }
    }
    case constants.UNSET_PLAYING_TRACK: {
      return {
        ...initialState
      }
    }
    default:
      return state;
  }
}
