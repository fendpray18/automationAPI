const supertest = require('supertest');

const apiv2 = supertest('https://api.punkapi.com/v2');

module.exports = {apiv2};
