import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '40727014-499e89a10edf27dcbea28dfa6';

export async function getPhotos(userInput, page, perPage) {
  const params = new URLSearchParams({
    key: KEY,
    q: userInput,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: perPage,
    page: page,
  });
  const response = await axios.get(`${BASE_URL}?${params}`);
  return response.data;
}
