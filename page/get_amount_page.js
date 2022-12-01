const url = require('../helper/common.js');

const api = url.apiv2;
const beersPath = '/beers';

function getBeers() {
  return api
    .get(beersPath)
    .set('Accept', 'application/json');
}

function getPaginationData(page) {
  return api
    .get(`${beersPath}/?page=2&per_page=${page}`)
    .set('Accept', 'application/json');
}


module.exports = {
    getBeers,
    getPaginationData,
};