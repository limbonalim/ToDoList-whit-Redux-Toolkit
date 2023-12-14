import axios from 'axios';

const AxiosApi = axios.create({
  baseURL: 'https://my-blog-b9721-default-rtdb.europe-west1.firebasedatabase.app'
});

export default AxiosApi;