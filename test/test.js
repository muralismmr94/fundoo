/***************************************************************************
 * Execution : 1.default node     cmd>node test.js
 *             2.if mocha installed  cmd> npm test
 * purpose  : testing  a fundoo application
 * @description
 * @file    : test.js
 * @overview :testing register,login,forgotpassword and resetpassword .
 * @author  : Murali s <muralismmr94@gmail.com>
 * @version :1.0
 * 
 ***************************************************************************/
/**
 * importing required modules
 */
const chai = require('chai');
const expect = chai.expect;
const test = require('supertest');
const server = require('../server');
const chai_http = require('chai-http');
chai.use(chai_http);

//const read = require('readline-sync');
function testj(){
const fs = require('fs');
const readJson = fs.readFileSync('/home/admin1/Desktop/fundoo/test/testJson.json');
const data = JSON.parse(readJson);
console.log(data)
return data;
}
console.log("required values of the entaired values"+testj());

/**
 * the function which holds the collection of tests
 */
describe('GraphQL', () => {

   
    /**
     * a function which is actually a test of login
     */
    it('loginUser', (done) => {
        const jsonObj = testj();
        test(server)
            .post('/graphql')
           // .send({ query: 'mutation{loginUser(email:"muralismmr94@gmail.com" password:"Murali@123"){message} }' })
           .send({query:jsonObj+'{message}'})
            .expect(200)
            .end((err, res) => {
                /**
                 * if error means its shows an error
                 */
                if (err) return done(err);
                /**
                 * if expected data comes means its shows login success
                 */
                expect(JSON.parse(res.text).data.loginUser.message).to.deep.equal(
                    "login successful"
                )
                done();
            })
    });
    /**
     * a function which is actually a test of registerUser
     */
    it('registerUser', (done) => {
        test(server)
            .post('/graphql')
           // .send({ query: 'mutation{registerUser(firstname:"murali" lastname:"s" email:"muralismmr94@gmail.com" password:"Murali@123"){message} }' })
           .send({query:'mutation{jsonObj.registerUser}){message}}'})
            .expect(200)
            .end((err, res) => {
                /**
                * if error means its shows an error
                 */

                if (err) return done(err);
                /**
                * if expected data comes means its shows register success
                */
                expect(JSON.parse(res.text).data.registerUser.message).to.deep.equal(

                    "registration unsuccessful , email already exists"

                )
                done()
            })
    });
    /**
     * a function which is actually a test of forgotPassword
     */
    it('forgotPassword', (done) => {
        test(server)
            .post('/graphql')
            .send({ query: 'mutation{forgotPassword(email:"muralismmr94@gmail.com"){message}}' })
            .expect(200)

            .end((err, res) => {
                /**
                * if error means its shows an error
                */
                if (err) return done(err);
                /**
                * if expected data comes means its shows forgot password success
                */
                expect(JSON.parse(res.text).data.forgotPassword.message).to.deep.equal(
                    "forgot password executed"
                )
                done();
            })
    });
})








// "registerUser": [
//     {
//         "firstname": "murali",
//         "lastname": "s",
//         "email": "muralismmr94@gmail.com",
//         "password": "Murali@123"
//     },
//     {
//         "firstname": "manoj",
//         "lastname": "s",
//         "email": "manoj@gmail.com",
//         "password": "Manoj@123"
//     },
//     {
//         "firstname": "akshay",
//         "lastname": "ks",
//         "email": "akshaykc27@gmail.com",
//         "password": "Akshay@123"
//     },
//     {
//         "firstname": "prasanna",
//         "lastname": "more",
//         "email": "prasanna.more@gmail.com",
//         "password": "Prasanna@123"
//     }
// ],