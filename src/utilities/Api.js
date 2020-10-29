import axios from 'axios';

// only including GET here, since the API only supports GET
export default {
    get(url, headers = {}, params = {}) {
        return axios.get(url, {
            headers,
            params
        });
    }
};
