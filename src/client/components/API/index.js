import axios from 'axios';

export const getNews = page =>
    axios.get(`http://localhost:3000/stories/${page}`).then(response => {
        return response.data;
    });

export const getComments = id =>
    axios
        .get(`http://localhost:3000/comments/${id}`)
        .then(response => response.data);
