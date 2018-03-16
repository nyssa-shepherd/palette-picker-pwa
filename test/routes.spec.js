process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return the homepage', () => {
    return chai.request(server)
    .get('/')
    .then(response => {
      response.should.have.status(200);
      response.should.be.html;
    })
    .catch(err => {
      throw err;
    });
  });

  it('should return a 404 for a route that does not exist', () => {
    return chai.request(server)
    .get('/sad')
    .then(response => {
      response.should.have.status(404);
    })
    .catch(err => {
      throw err;
    });
  });
});

describe('API Routes', () => {

  describe('GET /api/v1/projects', () => {

    it('should return all of the projects', () => {
      return chai.request(server)
      .get('/api/v1/projects')
      .then(response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('Nyssa\'s Project');
      })
      .catch(err => {
        throw err;
      });
    });

  });

  describe('POST /api/v1/projects', () => {

  //   it('should create a new ', () => {
  //     return chai.request(server)
  //     .post('/api/v1/projects') 
  //     .send({ name: 'My Rad Project' })
  //     .then(response => {
  //       response.should.have.status(201); 
  //       response.body.should.be.a('object');
  //       response.body.should.have.property('name');
  //       response.body.name.should.equal('My Rad Project');
  //     })
  //     .catch(err => {
  //       throw err;
  //     });
  //   });

    it('should not create a record with missing data', () => {
      return chai.request(server)
      .post('/api/v1/projects')
      .send()
      .then(response => {
        response.should.have.status(422);
        response.body.error.should.equal('Expected format: { name: <String> }. You\'re missing a "name" property.');
      })
      .catch(err => {
        throw err;
      });
    });
});

  describe('GET /api/v1/palettes', () => {

    it('should return all of the palettes', () => {
      return chai.request(server)
      .get('/api/v1/palettes')
      .then(response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('Bitchin Blue');
        response.body[0].should.have.property('color0');
        response.body[0].color0.should.equal('#3b73f2');
        response.body[0].should.have.property('color1');
        response.body[0].color1.should.equal('#08bbf3');
        response.body[0].should.have.property('color2');
        response.body[0].color2.should.equal('#4112e1');
        response.body[0].should.have.property('color3');
        response.body[0].color3.should.equal('#287b95');
        response.body[0].should.have.property('color4');
        response.body[0].color4.should.equal('#0a174c');
      })
      .catch(err => {
        throw err;
      });
    });

  });

  describe('POST /api/v1/palettes', () => {

    //   it('should create a new project', () => {
    //     return chai.request(server)
    //     .post('/api/v1/projects') 
    //     .send({ name: 'My Rad Project' })
    //     .then(response => {
    //       response.should.have.status(201); 
    //       response.body.should.be.a('object');
    //       response.body.should.have.property('name');
    //       response.body.name.should.equal('My Rad Project');
    //     })
    //     .catch(err => {
    //       throw err;
    //     });
    //   });
  
    it('should not create a record with missing data', () => {
      return chai.request(server)
      .post('/api/v1/projects/5/palettes')
      .send()
      .then(response => {
        response.should.have.status(422);
        response.body.error.should.equal('Expected format: { \n name: <String>, \n  color0: <String>, \n  color1: <String>, \n color2: <String>, \n color3: <String>, \n color4: <String>,\n projects_id: <Number>}. You\'re missing a "name" property.}');
      })
      .catch(err => {
        throw err;
      });
    });

    it('should return a 404 for a route that does not exist', () => {
      return chai.request(server)
      .post('/projects/:1003/palettes')
      .then(response => {
        response.should.have.status(404);
      })
      .catch(err => {
        throw err;
      });
    });
  
  });

});