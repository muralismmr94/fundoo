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
const fs = require('fs');
/**
 * reading the json file
 */
const readJson = fs.readFileSync('/home/admin1/Desktop/fundoo/test/testJson.json');
/**
 * converting string to object type
 */
const data = JSON.parse(readJson);
//console.log(`data display ${data.registerUser[0].email} `);

/**
 * the function which holds the collection of tests
 */
describe('GraphQL', () => {

    /**
     * a function which is actually a test of login
     */
    it('loginUser', (done) => {
        // const jsonObj = testj();
        test(server)
            .post('/graphql')
            .send({
                query: `mutation{loginUser(email: "${data.loginUser.email}"
                        password: "${data.loginUser.password}"){message}}`
            })
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
            .send({
                query: `mutation{registerUser(firstname:"${data.registerUser[0].firstname}"
                                                lastname:"${data.registerUser[0].lastname}"
                                                email:"${data.registerUser[0].email}"
                                                password:"${data.registerUser[0].password}"      
           ){message}}`})
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
            .send({ query: `mutation{forgotPassword(email:"${data.forgotPassword.email}"){message}}` })
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








