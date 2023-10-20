/// <reference types="cypress" />
import fruitsPage from '../pageObject/fruitsPage.js';

describe('Counting fruits data from csv file', () => {
  let totalSize;
  let uniqueFruitTypes;
  let amountEachFruit;

  it("AT_001.001 | should count amount of all fruits", () => {
    fruitsPage.countSizeFromCsv().then(size => {
      totalSize = size;
    });
  });

  it("AT_001.002 | should count types of fruits", () => {
    fruitsPage.typesOfFruitsFromCsv().then(types => {
      uniqueFruitTypes = types;
    });
  });

  it("AT_001.003 | should count the amount of each fruit", () => {
    fruitsPage.countNumbersOfEachFruits().then(amount => {
      amountEachFruit = amount;
    });
  });

  after(() => {
    fruitsPage.writeAllDataToCsv(totalSize, uniqueFruitTypes, amountEachFruit);
  });
});


  


