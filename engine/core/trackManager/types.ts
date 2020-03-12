export type TInitialState = {
  playingTrackId: string | null
}

export type TAction = {
  type: string;
  payload?: any;
}