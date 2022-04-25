import axios from 'axios';

axios.defaults.baseURL = "https://catfact.ninja/fact";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';

const botService = (input: string) => {
    return axios.get('/')
        .then(response => {
            return response.data.fact
        })
        .catch(error => {
            console.log(error);
            return "Optimus is having an internal server Error! 💔 Please try again;"
        })
}


export default botService;




