process.env.NODE_ENV = "test";

const sequelize = require('sequelize');
const User = require('../models/User');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const expect = require('chai').expect;

chai.use(chaiHttp);

describe('Login', () => {
  
  describe('/GET login', () => {
    it('it should GET the login page', (done) => {
      chai.request(server)
        .get('/login')
        .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    })
  })
});

describe('/POST login', () => {
  it('it should login the user', (done) => {
    var email = "admin@admin.com";
    var password = "admin";
    chai.request('http://127.0.0.1:3000')
      .post('/login')
      
      .send(email)
      .send(password)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.redirectTo('http://127.0.0.1:3000/auth/success');
        done();
      });
  })
})

/*describe('/POST book', () => {
      it('it should not POST a book without pages field', (done) => {
        let book = {
            title: "The Lord of the Rings",
            author: "J.R.R. Tolkien",
            year: 1954
        }
        chai.request(server)
            .post('/book')
            .send(book)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('pages');
                res.body.errors.pages.should.have.property('kind').eql('required');
              done();
            });
      });

  });
});*/