import axios from 'axios';
import { BACKEND_ORIGIN } from '../utility/apiUrl';

const instance = axios.create({
    baseURL: BACKEND_ORIGIN + '/api/forum'
});

export default instance;