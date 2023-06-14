const expect = require('chai').expect;

/**
 * validate if the current entry is a type of the expected ones
 * @param {*} actualEntry
 * @param {string[]} possibleTypes
 * @param {*} currentKey
 */
function validateByMultipleTypes(actualEntry, possibleTypes, currentKey) {
  // Multiple possible types of one value thus in need for a special validation just for it
  expect(possibleTypes).to.include(typeof actualEntry, `${currentKey} was: ${actualEntry}, `);
}

/**
 * Validate if the entry have the same type passed
 * @param {*} actualEntry
 * @param {string} expectedType
 * @param {*} currentKey
 */
function validateByType(actualEntry, expectedType, currentKey) {
  expect(typeof actualEntry).to.be.eq(expectedType, `${currentKey} was: ${actualEntry}, `);
}

module.exports = {
  /**
     * validate if the keys of two objects are equals
     * @param {object} actualObj
     * @param {object} expectedObj
     */
  validateKeys(actualObj, expectedObj) {
    Object.keys(actualObj).forEach((entry) => {
      expect(Object.keys(expectedObj)).to.include(entry,
          `One or more keys are missing`);
    });
  },

  /**
     * validates a list of objects against the expected object
     * @param {[object]} actualListObj
     * @param {object} expectedObj
     */
  validateKeysList(actualListObj, expectedObj) {
    actualListObj.every((item) => {
      this.validateKeys(item, expectedObj);
    });
  },

  /**
     * validate the value type for each entry
     * @param {object} actualObj
     * @param {object} expectedObj
     * @param {string[]} specialValidation opitional list with the special validation keys
     */
  validateValueType(actualObj, expectedObj, specialValidation = ['']) {
    const rng = Math.floor((Math.random() * (actualObj.length)));
    const currentObject = actualObj[rng] ? actualObj[rng] : actualObj;
    let currentValue;
    Object.keys(currentObject).forEach((entry, index) => {
      currentValue = Object.values(currentObject)[index];
      if (specialValidation.includes(entry)) {
        validateByMultipleTypes(currentValue, expectedObj[entry], entry);
      } else {
        validateByType(currentValue, expectedObj[entry], entry);
      }
    });
  },
};
