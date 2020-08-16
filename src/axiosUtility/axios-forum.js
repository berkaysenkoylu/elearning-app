import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://glacial-garden-54072.herokuapp.com/api/forum'
});

export default instance;