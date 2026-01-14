import axios from "axios";

const BASE_URL = 'https://api.kunjungfamily.site/api';

export default axios.create({
  baseURL: BASE_URL,
});