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
const test = require('supertest')
const server = require('../server')
/**
 * the function which holds the collection of tests
 */
describe('GraphQL', () => {

    /**
     * a function which is actually a test of login
     */
    it('loginUser', (done) => {
        test(server)
            .post('/graphql')
            .send({ query: 'mutation{loginUser(email:"muralismmr94@gmail.com" password:"Murali@123"){message} }' })
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
            .send({ query: 'mutation{registerUser(firstname:"murali" lastname:"s" email:"muralismmr94@gmail.com" password:"Murali@123"){message} }' })
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