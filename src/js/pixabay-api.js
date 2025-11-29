import axios from 'axios';

export const getImagesByQuery = (query, page) => {
  return axios
    .get('https://pixabay.com/api/', {
      params: {
        key: '53333096-0ed2bac8b305690550bcf3f17',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        q: `${query}`,
        per_page: 15,
        page: page,
      },
    })
    .then(el => el.data);
};
