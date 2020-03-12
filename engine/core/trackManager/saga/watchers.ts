import {takeEvery, all, call} from 'redux-saga/effects'
import {PLAY_CURRENT_TRACK} from '../constants'
import {playCurrentTrackWorker} from './workers/playCurrentTrack'

export function* playCurrentTrackWatcher() {
  yield takeEvery(PLAY_CURRENT_TRACK, playCurrentTrackWorker)
}
