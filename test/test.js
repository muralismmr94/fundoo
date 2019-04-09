const chai = require('chai');
//const assert = require('assert');
const expect = chai.expect;
const url = `http://localhost:5000/`;
const request = require('supertest')(url);
//var Query = require('../graphql/queries/user').queryType

describe('GraphQL', () => {

    it('Returns user with email', (done) => {
        request.post('/graphql')
        .send('mutation{loginUser(email password){message} }')
        .expect(200)
        .end((err,res) => {
            // res will contain array with one user
            if (err) return done(err);
            // console.log(err);
            // console.log(res)
            res.body.user.should.have.property('id')
            res.body.user.should.have.property('name')
            res.body.user.should.have.property('firstname')
            res.body.users.should.have.property('email')
            res.body.users.should.have.lengthOf(6);
            //done();
           
        })
         done();
    })
    it('Returns all users', (done) => {
        
        request.post('/graphql')
        .send({ mutation: '{ ( firstname  ) }' })
        .expect(200)
        .end((err, res) => {
            console.log(done);
            
            // res will contain array of all users
            if (err) return done(err);
            console.log(err);
            
            // res.body.users.should.have.property('firstname')
            // res.body.users.should.have.property('lastname')
            // res.body.users.should.have.property('email')
            // res.body.users.should.have.property('password')
           // assume there are a 5 users in the database
            res.body.users.should.have.lengthOf(5);
            
           
            
        })
        done()
    })
})