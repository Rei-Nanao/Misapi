const axios = require('axios');

class Login {
    constructor (host) {
        this.host = host;
    }

    async appRegister(appName, appDescription, appPermission) {
        //Set up baseurl
        const knocker = axios.create({
            method: 'post',
            baseURL: 'https://' + this.host + '/api/'
        });

        //App Create
        const appCreate = await knocker('app/create', {
            name: appName,
            description: appDescription,
            permission: appPermission
        });

        //Make a token to authrizetion app
        const authGenerate = await knocker('auth/session/generate', {
            appSecret: secret
        });

        //Sort variable
        const secret = await appCreate.data.secret;
        const token = await authGenerate.data.token;
        const url = await authGenerate.data.url;

        //Make response data
        const res = {
            secret,
            token,
            url 
        }

        return res;
    }
    
    async get_i(appSecret, token){
        const res = await this.post("auth/session/userkey", {
            appSecret: appSecret,
            token: token
        });
    
        return res;
    } 

}

module.exports = Login;