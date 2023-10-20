/// <reference types="cypress" />
import fruitsPage from '../pageObject/fruitsPage.js';

describe('Counting fruits data from csv file', () => {
  let totalSize;
  let uniqueFruitTypes;

  it("AT_001.001 | should return result in csv file", () => {
    fruitsPage.countSizeFromCsv().then(size => {
      totalSize = size;
    });
  });

  it("AT_001.002 | should count types of fruits", () => {
    fruitsPage.typesOfFruitsFromCsv().then(types => {
      uniqueFruitTypes = types;
    });
  });

  after(() => {
    fruitsPage.writeAllDataToCsv(totalSize, uniqueFruitTypes);
  });
});


  


