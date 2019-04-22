//https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#web-application-flow
var authConfig = require('../../auth/gitconfig').github
const axios = require('axios')
const userAuth = require('../types/users').userAuth
const UserModel = require('../../models/users');


function socialAuthLogin() {

}
socialAuthLogin.prototype.postMethod = {

    type: userAuth,
    resolve(parent, params, context) {
       
        axios({
            // make a POST request
            method: 'post',
            // to the Github authentication API, with the client ID, client secret
            // and request token

            url: `https://github.com/login/oauth/access_token?client_id=${authConfig.clientID}&client_secret=${authConfig.clientSecret}&code=${context.code}`,
            // Set the content type header, so that we get the response in JSOn
            headers: {
                accept: 'application/json'
            }
        }).then((response) => {
            // Once we get the response, extract the access token from
            // the response body
            const accessToken = response.data.access_token;
            console.log(accessToken);
            tokenGet(accessToken);
        })

        function tokenGet(accessToken) {
            axios({
                // make a POST request
                method: 'get',
                // to the Github authentication API, with the client ID, client secret
                // and request token

                url: `https://api.github.com/user?access_token=${accessToken}`,
                // Set the content type header, so that we get the response in JSOn
                headers: {
                    accept: 'application/json'
                }
            }).then((response) => {
                // Once we get the response, extract the access token from
                // the response body
                console.log(response.data);
                var user = new UserModel({
                    verifyGit: true,
                    gitUserName: response.data.login,
                    gitId: response.data.id
                })
                 user = user.save();
                if (!user) {
                    console.log("gituser saved unsuccessfull")
                    return {
                        "message": "gituser saved unsuccessfully"
                    }

                }
                else {
                    console.log("gituser saved successfully");
                    return {
                        "message": "gituser saved successfully"
                    }
                }
            })
        }
    }

}




module.exports = new socialAuthLogin;