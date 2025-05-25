import axios from 'axios';

const CLIENT_ID = '7acca1a3c51a437ab8a9970c1dbbf537';
const CLIENT_SECRET = '3fb57a5529f043dbb6691a01a9f6aa06';
const BASE_URL = 'https://api.spotify.com/v1';

let accessToken = null;

const getToken = async () => {
  if (accessToken) return accessToken;

  const tokenResponse = await axios.post(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({ grant_type: 'client_credentials' }),
    {
      headers: {
        Authorization:
          'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  accessToken = tokenResponse.data.access_token;
  return accessToken;
};

export const searchTracks = async (query) => {
  const token = await getToken();

  const response = await axios.get(`${BASE_URL}/search`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: query,
      type: 'track',
      limit: 10,
    },
  });

  return response.data.tracks.items;
};
