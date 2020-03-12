export type TInitialState = {
  data: TData[]
  loading: boolean
  errors: null | string[]
};

export type TData = {
  id: string;
  title: string;
  minCover: TPlaylistMinCover | null;
  tracks: TTrack[] | [];
}

export type TPlaylistMinCover = {
  url: string;
  size: number;
};

export type TTrack = {
  key: string;
  title: string;
  order: number;
  duration: number;
  media: {
    mp3: {
      url: string;
      headUrl: string;
    };
  };
  isAvailable: boolean;
};

export type TAction = {
  type: string;
  payload?: any;
}