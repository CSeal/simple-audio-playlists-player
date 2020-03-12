// Core
import { all, call } from 'redux-saga/effects';
// Watchers
import {fetchPlaylistWatcher} from '../../core/main/saga/watchers'
import {playCurrentTrackWatcher} from '../../core/trackManager/saga/watchers'

export function* rootSaga(){
  yield all([
    call(fetchPlaylistWatcher),
    call(playCurrentTrackWatcher),
  ])
}
