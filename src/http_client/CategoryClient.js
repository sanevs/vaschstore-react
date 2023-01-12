import axios from 'axios';

const URL = 'http://localhost:8080/categories/';

class CategoryClient
{
    getAll()
    {
        return axios.get(URL + 'all');
    }
}

export default new CategoryClient();