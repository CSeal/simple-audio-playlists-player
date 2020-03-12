import {actionsCreater} from '../../../helpers/actionsCreater'
import * as constants from './constants'

export const actions = Object.freeze({
  playlistsLoading: actionsCreater(constants.LOADING_INIT_DATA),
  playlistsLoadedFailure: actionsCreater(constants.INIT_DATA_LOADED_FAILURE),
  playlistsLoadedSuccess: actionsCreater(constants.INIT_DATA_LOADED_SUCCESS),
});