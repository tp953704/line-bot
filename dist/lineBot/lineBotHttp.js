"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lineBotHttp = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios_1.default.get(url, {
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
function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios_1.default.post(url, data).then((response) => {
            resolve(response);
        }, (err) => {
            reject(err);
        });
    });
}
function del(url, delData = {}) {
    return new Promise((resolve, reject) => {
        axios_1.default.delete(url, { data: delData }).then((response) => {
            resolve(response.data);
        }, (err) => {
            reject(err);
        });
    });
}
function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios_1.default.put(url, data).then((response) => {
            resolve(response.data);
        }, (err) => {
            reject(err);
        });
    });
}
exports.lineBotHttp = {
    get,
    post,
    del,
    put
};
//# sourceMappingURL=lineBotHttp.js.map