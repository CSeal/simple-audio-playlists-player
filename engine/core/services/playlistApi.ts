import BaseApi, {TExtendsClassProps,  TRequestResult, ICRUDParams} from './baseApi';
import {playlistRoutes} from '../../config/global'

class PlaylistApi extends BaseApi {
  devMode: boolean;
  constructor({ baseURL, devMode = false }: TExtendsClassProps) {
    super(baseURL);
    this.devMode = devMode;
  }

  fetchPlaylistData(): Promise<TRequestResult> {
    const requestConfig: ICRUDParams = {
      route: playlistRoutes.freePlaylists
    }
    return super._get(requestConfig);
  }
}

export const playlistApi = new PlaylistApi({devMode: false})