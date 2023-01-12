import axios from 'axios';

const URL = 'http://localhost:8080/carts';

class CartClient
{
    getByPerson(person)
    {
        return axios.post(URL + '/getByPerson', person);
    }

    add(cart)
    {
        return axios.post(URL + '/add', cart);
    }
}

export default new CartClient();