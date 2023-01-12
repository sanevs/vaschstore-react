import axios from 'axios';

const URL = 'http://localhost:8080/humans/';

class PersonClient
{
    getPersons(userId)
    {
        return axios.get(URL + 'all/' + userId);
    }

    add(person)
    {
        return axios.post(URL + 'add', person);
    }
    
    getPerson(email, password)
    {
        return axios.get(URL + email + '/' + password);
    }
    getPersonCheck(email)
    {
        return axios.get(URL + email);
    }
}

export default new PersonClient();