import axios from 'axios';

const BASE_URL = 'https://api.jamendo.com/v3.0';
const CLIENT_ID = '6b4e4b1a';

export const searchTracks = async (query) => {
  const res = await axios.get(`${BASE_URL}/tracks`, {
    params: {
      client_id: CLIENT_ID,
      format: 'json',
      limit: 10,
      search: query,
    },
  });
  return res.data.results;
};
