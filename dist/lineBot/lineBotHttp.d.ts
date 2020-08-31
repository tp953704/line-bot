declare function get(url: string, params?: {}): Promise<unknown>;
declare function post(url: string, data?: {}): Promise<unknown>;
declare function del(url: string, delData?: {}): Promise<unknown>;
declare function put(url: string, data?: {}): Promise<unknown>;
export declare const lineBotHttp: {
    get: typeof get;
    post: typeof post;
    del: typeof del;
    put: typeof put;
};
export {};
