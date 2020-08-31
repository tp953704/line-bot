import Axios from 'axios';

function get(url:string, params = {}) {
    return new Promise((resolve, reject) => {
        Axios.get(url, {
            params: params,
        })
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
// todo: 離線版判斷
function post(url:string, data = {}) {
    return new Promise((resolve, reject) => {
        Axios.post(url, data).then(
            (response) => {
                resolve(response);
            },
            (err) => {
                reject(err);
            }
        );
    });
}

function del(url:string, delData = {}) {
    
    return new Promise((resolve, reject) => {
        Axios.delete(url,{data:delData}).then(
            (response) => {
                resolve(response.data);
            },
            (err) => {
                
                reject(err);
            }
        );
    });
}

function put(url:string, data = {}) {
    return new Promise((resolve, reject) => {
        Axios.put(url, data).then(
            (response) => {
                resolve(response.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
}

export const lineBotHttp = {
    get,
    post,
    del,
    put
}