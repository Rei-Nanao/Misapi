const axios = require('axios');

exports.modules = class LOGIN {
    constructor (host) {
        this.host = host
    }

    async post(endpoint, data) {
        const res = await axios({
            method: 'post',
            url: 'https://' + this.host + '/api/' + endpoint,
            data: data
        });
    
        return res.data;
    }

    async appCreate(appName, appDescription, appPermission) {
        const res = await this.post("app/create", {
            name: appName,
            description: appDescription,
            permission: appPermission
        });
    
        return res;
    }
    
    async authGenerate(appSecret) {
        const res = await this.post("auth/session/generate", {
            appSecret: appSecret
        });
    
        return res;
    }
    
    async getToken(appSecret, token){
        const res = await this.post("auth/session/userkey", {
            appSecret: appSecret,
            token: token
        });
    
        return res;
    } 

}