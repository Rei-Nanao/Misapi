# Misapi (Misskey Api for Node.js)
This is a Misskey library for Node.js.


## Installation
```
npm install misapi
```

## Usage
### 1. Make a Variable
You should make a variable to use Misapi on your project.
```node
const Misapi = require('misapi');
```

### 2. Initialize a Class
You should initilize a class to create application and get authorizetion Token. You need the URL is server you want to make your application.
```node
const login = new Misapi.Login('misskey.io')
```

_*The URL should be like misskey.io but unlike https://misskey.io/_

### 3. Get Application And Authorizetion Token
You should run a function. It will prepare all thing to get i.
```node
const app = await login.appRegister('Your Application Name', 'The Application Description', [
    'permission1', 'permission2'
]);
```

Example :
```node
const app = await login.appRegister('Example App', 'This is cat', [
    'write:notes', 'read:notes'
]);
```

After the function, you will receive application secret, token to authorizetion, and url to authorizetion.

### 4. Let's Get "i"
Now you are ready to get "i". Let's run this function!
```node
const i = await login.get_i('Application Secret', 'token');
```

You already have "i". Let's Enjoy!

### 5. Initialize api class
You have "i", so you should initialize a function!
```node
const api = new Misapi.Api('misskey.io', 'i');
```

### 6. Let's Use API!
By this function, you can use API easy. You should prepare endpoint and data.
```node
api.post('endpoint', 'data');
```

Example :
```node
api.post('notes/create', {
    visibility: 'followers',
    text: 'Hello World!'
})
```
That's all!

## Future Implements
WebSocket
