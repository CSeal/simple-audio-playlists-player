import {put, select} from 'redux-saga/effects';
import {currentTrackIdSelector} from '../../selectors';
import {TAction} from '../../types';
import {actions} from '../../actions';

export function* playCurrentTrackWorker(action: TAction) {
  const {payload: id} = action;
  const currentTrackId: string | null = yield select(currentTrackIdSelector);
  if (currentTrackId === null || currentTrackId !== id) {
    return yield put(actions.setCurrentTrack(id));
  }
  return yield put(actions.unsetCurrentTrack());
}
