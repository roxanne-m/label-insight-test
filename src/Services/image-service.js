import config from '../config';

const ImageApiService = {
  // Get request to get first 25 thumbnail images
  getImages() {
    return fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) =>
      !response.ok
        ? response.json().then((e) => Promise.reject(e))
        : response.json()
    );
  },
};

export default ImageApiService;
