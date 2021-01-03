const axios = require('axios');
const crypto = require("crypto")

class Login {
    constructor (host) {
        this.host = host;
        this.knocker = axios.create({
            baseURL: 'https://' + this.host + '/api/'
        });
    }

    async appRegister(appName, appDescription, appPermission) {
        try {
            //Define variable
            let secret;
            let token;
            let url;
            
            //App Create
            await this.knocker.post('app/create', {
                name: appName,
                description: appDescription,
                permission: appPermission
            }).then(function (res) { secret = res.data.secret; });

            //Make a token to authrizetion app
            await this.knocker.post('auth/session/generate', {
                appSecret: secret
            }).then(function (res) { token = res.data.token; url = res.data.url; });

            return {
                secret,
                token,
                url
            };

        } catch(err) {
            //Return HTTP Status Code and HTTP Status Text
            console.log(err.response.status + ' ' + err.response.statusText)
            return err.response;
        }
    }
    
    async get_i(appSecret, token) {
        let res;
        for(;;) {
            //Get token
            res = await this.knocker.post("auth/session/userkey", {
                    appSecret: appSecret,
                    token: token
            }).catch(function (){});
            if(res !== undefined) {
                //Make i
                const i = crypto.createHash("sha256")
                .update(res.data.accessToken + appSecret, "utf8")
                .digest("hex")
                return i;
            }
            //Wait a second to get token;
            await setTimeout(function(){},1000);
        } 
    }
}

class Api {
    constructor (host, i) {
        this.host = host;
        this.i = i;
        this.knocker = axios.create({
            baseURL: 'https://' + this.host + '/api/'
        });
    }

    async post(endpoint, data) {
        data.i = this.i;
        let res = this.knocker.post(endpoint, data);
        return res.data;
    }
}

module.exports = {
    Login,
    Api
};