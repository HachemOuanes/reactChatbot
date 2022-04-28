import axios from 'axios';
import { message } from '../types/message.type';

// axios.defaults.baseURL = "'https://google-search-5.p.rapidapi.com/google'";

const botService = (input: string) => {
    const responseObject: message = {
        user: "bot",
        text: "",
        date: new Date()
    }
    var config = {  
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Host': 'google-search-5.p.rapidapi.com',
            'X-RapidAPI-Key': 'decbc3b3d7msh2a275583ac282a6p124ac3jsn7cb0388c8ab4'
        }
    }
    var postData = {
        "query": `"${input}"`,
        "gl": "US",
        "hl": "en_US",
        "device": "desktop",
        "duration": "",
        "autocorrect": 0,
        "page": 1,
        "uule": "none-of-your-business",
        "pages": 1
    }

    return axios
        .post('https://google-search-5.p.rapidapi.com/google/organic-search', postData, config)
        .then(response => {
            responseObject.text = response.data.data.organic[0].snippet;
            responseObject.url = response.data.data.organic[0].url;
            return responseObject;
        })
        .catch(error => {
            console.log(error);
            responseObject.text = "Optimus is having an internal server Error! 💔 Please try again.";
            return responseObject;
        })
}


export default botService;




