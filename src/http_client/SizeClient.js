import axios from 'axios';

const URL = 'http://localhost:8080/sizes/';

class SizeClient
{
    getAll()
    {
        return axios.get(URL + 'all');
    }
}

export default new SizeClient();