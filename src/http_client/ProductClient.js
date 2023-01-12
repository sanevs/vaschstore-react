import axios from 'axios';

const URL = 'http://localhost:8080/products/';

class ProductClient
{
    getProducts()
    {
        return axios.get(URL + 'all');
    }

    getById(id)
    {
        return axios.get(URL + id);
    }

    add(product)
    {
        return axios.post(URL + 'add', product)
    }
    
    deleteById(id)
    {
        axios.post(URL + 'delete/' + id)
    }
}

export default new ProductClient();