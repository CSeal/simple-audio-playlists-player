import {actionsCreater} from '../../../helpers/actionsCreater'
import * as constants from './constants'

export const actions = Object.freeze({
  playCurrentTrack: actionsCreater(constants.PLAY_CURRENT_TRACK),
  setCurrentTrack: actionsCreater(constants.SET_PLAYING_TRACK),
  unsetCurrentTrack: actionsCreater(constants.UNSET_PLAYING_TRACK),
});