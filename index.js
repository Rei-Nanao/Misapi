const axios = require('axios');

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
            console.log(err.response.status + ' ' + err.response.statusText)
            return err.response;
        }
    }
    
    async get_i(appSecret, token){
        let res = await this.knocker.post("auth/session/userkey", {
                appSecret: appSecret,
                token: token
    }).catch(function (error) {console.log(error)});

        return res;
    } 

}

module.exports = Login;