import {takeEvery} from 'redux-saga/effects'
import {LOADING_INIT_DATA} from '../constants'
import {downloadFreePlaylists} from './workers/downloadPlaylists'

export function* fetchPlaylistWatcher() {
  yield takeEvery(LOADING_INIT_DATA, downloadFreePlaylists)
}


