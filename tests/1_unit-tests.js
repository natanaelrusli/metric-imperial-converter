const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

function mockConvert(input) {
  let initNum = convertHandler.getNum(input);
  let initUnit = convertHandler.getUnit(input);

  return convertHandler.convert(initNum, initUnit)
}

suite('Unit Tests', function(){

  suite ('Function convertHandler.getNum(input)', function() {

    test('Should correctly read a whole number input', function(done) {
      let input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test('Should correctly read a decimal number input', function(done) {
      let input = '3.2l';
      assert.equal(convertHandler.getNum(input), 3.2);
      done();
    });

    test('Should correctly read a fractional input', function(done) {
      let input = '3/2l';
      assert.equal(convertHandler.getNum(input), 1.5);
      done();
    });

    test('should correctly read a fractional input with a decimal', function(done) {
      let input = '4.5/1.5l';
      assert.equal(convertHandler.getNum(input), 3);
      done();
    });

    test('Should correctly return an error on a double-fraction (i.e. 3/2/3)', function(done) {
      let input = '10.0.0l';
      assert.equal(convertHandler.getNum(input), undefined);
      done();
    });

    test('Should correctly default to a numerical input of 1 when no numerical input is provided', function(done) {
      let input = 'mi';
      assert.equal(convertHandler.getNum(input), 1)
      done();
    });

    test('Should correctly read each valid input unit', function(done) {
      let input = '20mi';
      assert.equal(convertHandler.getUnit(input), 'mi')
      done();
    });

    test('Should correctly return an error for an invalid input unit', function(done) {
      let input = '20mis';
      assert.equal(convertHandler.getUnit(input), undefined)
      done();
    });

    test('Should return the correct return unit for each valid input unit', function(done) {
      let input = 'mi';
      assert.equal(convertHandler.getReturnUnit(input), 'km');
      done();
    });

    test('Should correctly return the spelled-out string unit for each valid input unit', function(done) {
      let input = 'mi';
      assert.equal(convertHandler.spellOutUnit(input), 'miles');
      done();
    });

    test('Should correctly convert gal to L', function(done) {
      let input = '20mi';

      assert.equal(mockConvert(input), 32.18680);
      done();
    });

    test('Should correctly convert L to gal', function(done) {
      let input = '20l';

      assert.equal(mockConvert(input), 5.28344);
      done();
    });

    test('Should correctly convert mi to km', function(done) {
      let input = '20mi';

      assert.equal(mockConvert(input), 32.18680);
      done();
    });

    test('Should correctly convert km to mi', function(done) {
      let input = '20km';

      assert.equal(mockConvert(input), 12.42745);
      done();
    });

    test('Should correctly convert lbs to kg', function(done) {
      let input = '20lbs';

      assert.equal(mockConvert(input), 9.07184);
      done();
    });

    test('Should correctly convert kg to lbs', function(done) {
      let input = '20kg';

      assert.equal(mockConvert(input), 44.09249);
      done();
    });

  })

});