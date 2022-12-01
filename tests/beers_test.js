const chai = require('chai');
const { expect } = require('chai');
const responseCodeMessage = require('../helper/data/responseMessageAndCode.json');
const amountValid = require('../helper/data/amount_data.json');
const page = require('../page/get_amount_page.js');
const schema = require('../helper/schema/beers_schema.json');
const jsonSchema = require('chai-json-schema');

chai.use(jsonSchema);

const scenario = {
  testSuite: {
    getBeers: 'Beers Documentation Access',
  },
  testCase: {
    positive: {
      checkBeers: 'Get All Beers Data',
      checkPaginationBeers: 'Get List Beers Data Based on Filter Pagination'
    },
    negative: {
      inputIncorrectPagination: 'Input Incorrect Pagination Criteria'
    }
  },
};

describe(scenario.testSuite.getBeers, () => {

  it(`@all @get @beers @positive ${scenario.testCase.positive.checkBeers}`, async () => {
    const respond = await page.getBeers();
    expect(respond.status).to.equal(responseCodeMessage.successOk);
    expect(Object.keys(respond.body).length).to.equal(amountValid.defaultLimited);

    var i = 0;
    const amountCount = Object.keys(respond.body).length;
    console.log(`Amount of Limited Data per Page is ${amountCount}`);
    while(i<amountCount){
      console.log('==============================');
      console.log(`iterate : ${i+1}`);
      console.log('name : ', Object.values(respond.body)[i].name);
      i++;
    }
    expect(respond.body).to.be.jsonSchema(schema);
  });

  it(`@all @get @pagination @positive ${scenario.testCase.positive.checkPaginationBeers}`, async () => {
    const pageCount = amountValid.requestNumberData.length;

    for (var i=0; i < pageCount; i++){
      var respond = await page.getPaginationData(amountValid.requestNumberData[i]);
      expect(respond.status).to.equal(responseCodeMessage.successOk);
      expect(Object.keys(respond.body).length).to.equal(amountValid.requestNumberData[i]);

      console.log('==============================');
      console.log(`Selected Number of Data : ${i}`);
      console.log(Object.keys(respond.body).length);
    }
    
  });

  it(`@all @get @pagination @negative ${scenario.testCase.negative.inputIncorrectPagination}`, async () => {
    const invalidData = amountValid.invalidInput;
    const respond = await page.getPaginationData(invalidData);
    expect(respond.status).to.equal(responseCodeMessage.failedBadRequest.codeNumber);
    console.log('Response Status : ', respond.status);
  });
});
