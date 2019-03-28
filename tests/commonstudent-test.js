process.env.NODE_ENV = "test"

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

const should = chai.should();

chai.use(chaiHttp)

describe('/POST commonstudents', () => {
    it('it should register student and teacher', (done) => {
        setTimeout( function () {
            const body = {
                "teacher": "teacherken@gmail.com",
                "students":
                    [
                      "studentjon@example.com",
                      "studenthon@example.com"
                    ]
            };
            chai.request(app)
            .post('/api/commonstudents')
            .send(body)
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
        },100);
    });
});

describe('/POST commonstudents', () => {
    it('it should register student and teacher', (done) => {
         setTimeout( function () {
            const body = {
                "teacher": "teacherjoe@gmail.com",
                "students":
                    [
                      "studentjon@example.com",
                      "studentmarrie@example.com"
                    ]
            };
            chai.request(app)
            .post('/api/commonstudents')
            .send(body)
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
         },100);
    });
});

describe('/POST commonstudents', () => {
    it('it should send an meaningful error message', (done) => {
         setTimeout( function () {
            const body = {
                "teacher": "",
                "students":
                    [
                      "studentjon@example.com",
                      "studentmarrie@example.com"
                    ]
            };
            chai.request(app)
            .post('/api/commonstudents')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                 res.body.should.have.property('message');
                done();
            });
         },100);
    });
});

describe('/GET commonstudents', () => {
    it('it should Get students of teacher ken', (done) => {
        chai.request(app)
        .get('/api/commonstudents?teacher=teacherken%40gmail.com')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('students').to.be.an('array');
            res.body.should.have.property('students').to.have.length(2);
            done();
        });
    });
});

describe('/GET commonstudents', () => {
    it('it should Get students of teacher ken and teacher joe', (done) => {
        chai.request(app)
        .get('/api/commonstudents?teacher=teacherken%40gmail.com&teacher=teacherjoe%40gmail.com')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('students').to.be.an('array');
            res.body.should.have.property('students').to.have.length(1);
            done();
        });
    });
});

describe('/GET commonstudents', () => {
    it('it should Get students of teacher martin', (done) => {
        chai.request(app)
        .get('/api/commonstudents?teacher=teachermartin%40gmail.com')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('students').to.be.an('array');
            res.body.should.have.property('students').to.have.length(0);
            done();
        });
    });
});

describe('/POST commonstudents', () => {
    it('it should suspend the student', (done) => {
        const body = {
            "student": "studentjon@example.com"
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
    it('it should get recipients ', (done) => {
        const data = {
            teacher: "teacherken@gmail.com",
            notification: "hello every one!",
        };

        chai.request(app)
        .post('/api/retrievefornotifications')
        .send(data)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('recipients').to.be.an('array');
            res.body.should.have.property('recipients').to.have.length(1);
            done();
        });
    });
});

describe('/POST retrievefornotifications', () => {
    it('it should get recipients ', (done) => {
        const data = {
            teacher: "teacherken@gmail.com",
            notification: "hello @studentmarrie@example.com",
        };

        chai.request(app)
        .post('/api/retrievefornotifications')
        .send(data)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('recipients').to.be.an('array');
            res.body.should.have.property('recipients').to.have.length(2);
            done();
        });
    });
});


describe('/POST deleteall', () => {
    it('it should delete all data', (done) => {
        chai.request(app)
        .get('/api/deleteall')
        .end((err, res) => {
            res.should.have.status(204);
           
            done();
        });
    });
});

describe('/POST commonstudents', () => {
    it('it should send an meaningful error message', (done) => {
         setTimeout( function () {
            const body = {
                "teacher": "",
                "students":
                    [
                      "studentjon@example.com",
                      "studentmarrie@example.com"
                    ]
            };
            chai.request(app)
            .post('/api/commonstudents')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                 res.body.should.have.property('message');
                done();
            });
         },100);
    });
});


describe('/POST retrievefornotifications', () => {
    it('it should send an meaningful message', (done) => {
        const data = {
            teacherabc: "teacherken@gmail.com",
            notification: "hello @studentmarrie@example.com",
        };

        chai.request(app)
        .post('/api/retrievefornotifications')
        .send(data)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('message');
            done();
        });
    });
});

describe('/POST commonstudents', () => {
    it('it should suspend the student', (done) => {
        const body = {
            "woringstudendbody": "studentjon@example.com"
        };
        chai.request(app)
        .post('/api/suspend')
        .send(body)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('message');
            done();
        });
    });
});