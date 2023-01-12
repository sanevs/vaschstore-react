import axios from 'axios';

const URL = 'http://localhost:8080/cartItems';

class CartItemClient
{
    getallByCart(cart)
    {
        return axios.post(URL + '/allByCart', cart);
    }

    add(cartItem)
    {
        return axios.post(URL + '/add', cartItem);
    }

    deleteById(id)
    {
        axios.post(`${URL}/delete/${id}`);
    }
    
    clearByCartId(cartId)
    {
        axios.post(URL + '/clearByCartId/' + cartId);
    }
}

export default new CartItemClient();