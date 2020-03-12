export const baseUrl = process.env.REACT_APP_DOMAIN_URI || 'https://iawake-backend-devel.dokku.f17y.com';
export const apiRoute = process.env.REACT_APP_API_URI || '/api/v1/';

export const playlistRoutes = Object.freeze({
  freePlaylists: 'programs/free'
})