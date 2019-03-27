process.env.NODE_ENV = "test"

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

const should = chai.should();

chai.use(chaiHttp)


describe('/GET commonstudents', () => {
    it('it should Get all students', (done) => {
        chai.request(app)
        .get('/api/commonstudents')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
});

describe('/POST commonstudents', () => {
    it('it sould suspend the student', (done) => {
        const body = {
            "student": "genk@gmail.com"
        };
        chai.request(app)
        .post('/api/suspend')
        .send(body)
        .end((err, res) => {
            res.should.have.status(204);
            done();
        });
    });
});


describe('/POST retrievefornotifications', () => {
    it('it sould get recipients ', (done) => {
        const data = {
            teacher: "manhpd@gmail.com",
            notification: "hello @student1@gmail.com",
        };

        chai.request(app)
        .post('/api/retrievefornotifications')
        .send(data)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('recipients').to.be.an('array');
            done();
        });
    });
});