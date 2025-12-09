import axios from 'axios'

const files = {
    request({method, url, data, params}) {
        try {
            return axios({
                method: method,
                url: url,
                data: data,
                params: params
            })
                .then(function (response) {
                    return response.data
                })
                .catch(function (error) {
                    if (error.response) {
                        return error.response.data;
                    } else {
                        return false;
                    }
                });
        } catch (e) {
            console.log(e);
            return false;
        }

    },
    async source() {
        return this.request({
            method: "GET",
            url: `https://storage.googleapis.com/static-json-2024/data.json?t=${new Date().getTime()}`,
        });
    },

    async showcase() {
        return this.request({
            method: "GET",
            url: `https://storage.googleapis.com/static-json-2024/showcase.json?t=${new Date().getTime()}`,
        });
    },
}

export default files;
