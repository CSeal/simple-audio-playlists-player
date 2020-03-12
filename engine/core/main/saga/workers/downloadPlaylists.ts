import {put, call} from 'redux-saga/effects'
import {playlistApi} from '../../../services/playlistApi'
import {TRequestResult} from '../../../services/baseApi'
import {actions} from '../../actions'
import {TData} from '../../types'

export function* downloadFreePlaylists(){
  try {
    const rezult: TRequestResult = yield call(playlistApi.fetchPlaylistData);
    if (rezult.status >= 400) {
      return yield put(actions.playlistsLoadedFailure(rezult.statusText));
    }
    const preparedPlaylistData: TData[] = rezult.data.data.map(item => ({
        id: item.id,
        title: item.title,
        minCover: item?.cover?.resolutions.find(rezolutions => rezolutions.size === 16) || null,
        tracks: item.tracks,
    }));
    yield put(actions.playlistsLoadedSuccess(preparedPlaylistData));
  } catch(err) {
    return yield put(actions.playlistsLoadedFailure(err.message));
  }

}