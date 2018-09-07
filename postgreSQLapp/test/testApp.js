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

    chai.use(chaiHttp);

    describe('# test user controllers', function () {
        it('#it should GET ALL users and set status 200, resp is array', () => {
            const requester = chai.request(server)
                .get('/users/')
                .then(function (res) {
                    expect(res).to.have.status(200);
                })
                .catch(function (err) {
                    throw err;
                });


        });
        it('#it should GET ALL users and  resp is array', () => {
            chai.request(server)
                .get('/users/')
                .then(function (res) {
                    expect(res.body).to.be.an('array');
                })
                .catch((error) => {
                    console.log(error.message)
                });

        })
    })

});


