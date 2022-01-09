import axios from 'axios';
const BaseURL = process.env.REACT_APP_BASE_URL;

// axios base instance
const http = axios.create({
    baseURL: BaseURL,
    responseType: 'json'
})

function getHeaders(isSecured) {
    let options = {
        'Content-Type': 'application/json'
    }
    if (isSecured) {
        options['Authorization'] = localStorage.getItem('token');
    }
    return options;
}

const POST = (url, data, isSecured = false, params = {}) => {
    return http
        .post(url, data, {
            headers: getHeaders(isSecured)
        })
}
const GET = (url, isSecured = false, params = {}) => {
    return http
        .get(url, {
            headers: getHeaders(isSecured),
            params: params
        })
}
const PUT = (url, data, isSecured = false, params = {}) => {
    return http
        .put(url, data, {
            headers: getHeaders(isSecured)
        })
}
const DELETE = (url, isSecured = false, params = {}) => {
    return http
        .delete(url, {
            headers: getHeaders(isSecured)
        })
}

const UPLOAD = (method, url, data, files = []) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();

        // append files to formaData
        if (files.length) {
            formData.append('image', files[0], files[0].name);
        }

        // append textual data to formData
        for (let key in data) {
            formData.append(key, data[key]);
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.response)
                } else {
                    reject(xhr.response)
                }
            }
        }

        xhr.open(method, `${BaseURL}/${url}?token=${localStorage.getItem('token')}`, true);
        xhr.send(formData);
    })

}

export default {
    POST,
    GET,
    PUT,
    DELETE,
    UPLOAD
}

