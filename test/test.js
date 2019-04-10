const chai = require('chai');
//const assert = require('assert');
const expect = chai.expect;
const test = require('supertest')
const server = require('../server')
//var Query = require('../graphql/queries/user').queryType

describe('GraphQL', () => {
    

    it('loginUser', (done) => {
        test(server)
            .post('/graphql')
            .send({ query: 'mutation{loginUser(email:"muralismmr94@gmail.com" password:"Murali@123"){message} }' })
            .expect(200)
            .end((err, res) => {

                if (err) return done(err);
                expect(JSON.parse(res.text).data.loginUser.message).to.deep.equal(
                   // "token genereated ==> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11cmFsaXNtbXI5NEBnbWFpbC5jb20iLCJpYXQiOjE1NTQ4OTYxOTksImV4cCI6MTU1NDk4MjU5OX0.IoS8SU89cS74yTVt1IFdSm6egA4hRy1mq-r2NfulkiM"
                   "token genereated"
                )
                done();
            })
    });

    it('registerUser', (done) => {
        test(server)
            .post('/graphql')
            .send({ query: 'mutation{registerUser(firstname:"vicky" lastname:"r" email:"vicky@gmail.com" password:"Vick@123"){message} }' })
            .expect(200)
            .end((err, res) => {
                // console.log(done);

                // res will contain array of all users
                if (err) return done(err);
                //console.log(err);

                expect(JSON.parse(res.text).data.registerUser.message).to.deep.equal(
                    
                   // "registration successful"
                   "registration unsuccessful , email already exists"
                    
                )
                done()


            })

    });
    it('forgotPassword', (done) => {
        test(server)
            .post('/graphql')
            .send({ query:'mutation{forgotPassword(email:"muralismmr94@gmail.com"){message}}' })
            .expect(200)
            .end((err, res) => {

                if (err) return done(err);
                expect(JSON.parse(res.text).data.forgotPassword.message).to.deep.equal(
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11cmFsaXNtbXI5NEBnbWFpbC5jb20iLCJpYXQiOjE1NTQ5MDA0MTAsImV4cCI6MTU1NDk4NjgxMH0.z1nsWYpJupa1pPejJncRdqVJNhk_uTUYH1WFx5Ldah8"
                )
                done();
            })
    });

})