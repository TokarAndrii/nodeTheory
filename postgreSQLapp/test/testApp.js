let chai = require('chai');
const assert = require('chai').assert;
const should = require('chai').should;
const expect = require('chai').expect;
const {create} = require('../model/user');
const user = require('../model/user');
const userControllers = require("../controllers/userControllers");
const connect = require('../utils/connect');
const chaiHttp = require('chai-http');
const server = require('../app');
const request = require('supertest');
const createUsers = require('../seeders/index');


chai.use(chaiHttp);


describe("# test app ", function () {

    describe("#DB connection (from Utils > connect", function () {
        const result = connect.sequelize.authenticate();
        //bellow same as: it('> connect.sequelize.authenticate() shold work', ()=> connect.sequelize.authenticate())
        it('# connect.sequelize.authenticate() shold work', function (done) {
            /*
            * bellow same as: result.then((data)=>done()).catch(done)
            */
            result
                .then(data => {
                    done();
                })
                .catch(error => {
                    done(error)
                })
        });
    });


    describe('# test user controllers', function () {

        // runs before all tests in this block
        before(function () {
            user.destroy({where: {}, force: true});

            createUsers();
        });

        // runs after all tests in this block
        after(function () {
            user.destroy({where: {}, force: true});
            //server.close();
        });


        it('#GET ALL - it should  users and set status 200, resp is array', () => {
            const requester = chai.request(server)
                .get('/users/')
                .then(function (res) {
                    expect(res).to.have.status(200);
                })
                .catch(function (err) {
                    throw err;
                });


        });

        it('#GET ALL - it should  users and  resp is array', () => {
            chai.request(server)
                .get('/users/')
                .then(function (res) {
                    expect(res.body).to.be.an('array');
                })
                .catch((error) => {
                    console.log(error)
                });

        });

        it('#POST - should not a user without "firstName" field ', async function () {
            const firstName = "test5666";
            let user = {
                lastName: "some",
                age: 25
            };
            const agent = chai.request.agent(server);

            await agent
                .post(`/users/${firstName}`)
                .send(user)
                .then(function (res) {
                    expect(res).to.have.status(200);

                    return agent.get(`/users/${firstName}`)
                        .then(function (res) {
                            expect(res).to.have.status(200);
                            expect(res.body.firstName).to.be.equal(`${firstName}`);
                        });
                })
        });


        it('#DELETE ALL  - it should delete all users', async function () {
            await  chai.request(server)
                .delete('/users')
                .then(function (res) {
                    expect(res.body.length).to.be.equal(0);
                    expect(res.body).to.be.an('array');
                })
        });
    });


});


