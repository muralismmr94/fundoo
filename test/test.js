const chai = require('chai');

const expect = chai.expect;
const url = `http://localhost:5000/`;
const request = require('supertest')(url);

describe('GraphQL', () => {
    it('Returns token', (done) => {
        request.post('/graphql')
        .send({ mutation: '{ login(email: "manoj@gmail.com",password:"Manoj@123"), { message } }'})
        .expect(200)
        .end((err,res) => {
            // res will contain array with one user
            if (err) return done(err);
            res.body.user.should.have.property('message')
            done();
        })
    })
})
// it('Returns all users', (done) => {
//     request.post('/graphql')
//     .send({ query: '{ users { id  email } }' })
//     .expect(200)
//     .end((err, res) => {
//         // res will contain array of all users
//         if (err) return done(err);
//         // assume there are a 100 users in the database
//         res.body.user.should.have.lengthOf(1);
//     })  
