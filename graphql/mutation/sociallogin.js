//https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#web-application-flow
var authConfig = require('../../auth/gitconfig').github
const axios = require('axios')
const userAuth = require('../types/users').userAuth
const UserModel = require('../../models/users');
const sendmailer = require('../../sendmailer');
const jwt = require('jsonwebtoken');


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
            console.log("responce", response.data)
            const accessToken = response.data.access_token;
            console.log("access token",accessToken);

            tokenGet(accessToken);
            return{
                "message":"social login post method success"
            }
        }).catch((err)=>{
            throw err;
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
                    verifyGit: false,
                    gitUserName: response.data.login,
                    gitId: response.data.id
                })
                user = user.save();
                if (!user) {
                    console.log("gituser saved unsuccessfull");
                    return {
                        "message": "gituser saved unsuccessfully"
                    }

                }
                else {
                    var secret = "abcdefg"
                    var token = jwt.sign({ gitId: response.data.id, gitUserName: response.data.login }, secret);
                    console.log("generatetoken",token);
                    var url = `http://localhost:5000/graphql?token=${token}`
                    sendmailer.sendEmailer(url, response.data.email);
            

                    console.log("gituser saved successfully");
                    return {
                        "message": "gituser saved successfully"
                    }
                }
            })
            return {
                "message": "gituser saved successfully"
            }
        }
    }

},
socialAuthLogin.prototype.verifyEmail={
    type:userAuth,
    async resolve(parent,params,context){
        var secret = "abcdefg"
        console.log(context.token)
        const payload = await jwt.verify(context.token,secret);
        if(!payload){
            console.log("git verified failed");
            return{
                "message":"git verified failed"
            }
        }

        const user = await UserModel.findOneAndUpdate({"gitId":payload.gitId},{$set:{"verifyGit":true}})
        if(!user){
            console.log('git id is not present');
            return{
                "message":"git id is not present"
            }
        }
        const userverify = await UserModel.findOne({"gitId":payload.gitId,"gitUserName":payload.gitUserName})
        if(!userverify){
            console.log("git user not found");
            return{
                "message":"git user not found"
            }
        }
        console.log("login successfully done")
        return{
            "message":"login successfully done"
        }

    }

}




module.exports = new socialAuthLogin;