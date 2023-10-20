/// <reference types="cypress" />
import fruitsPage from '../pageObject/fruitsPage.js';
import { data } from '../../fixtures/fruitsData.json'

describe('Counting fruits data from csv file', () => {
  let totalSize;
  let uniqueFruitTypes;
  let amountEachFruit;
  let characteristicsFruits;
  let countOverThreeDays;

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

  it("AT_001.004 | characteristics (size, color, shape, etc.) of each fruit by type", () => {
    fruitsPage.characteristicsOfFruits().then(char => {
      characteristicsFruits = char;
    });
  });

  it("AT_001.005 | Have any fruit been in the basket for over 3 days", () => {
    fruitsPage.countInTheBasketOverThreeDays().then(count => {
      countOverThreeDays = count;
    })
  });

  after(() => {
    fruitsPage.writeAllDataToCsv(totalSize, uniqueFruitTypes, amountEachFruit, characteristicsFruits, countOverThreeDays);

    cy.wait(3000); 
    fruitsPage.checkFileContent().then(fileContent => {
      expect(fileContent).to.contain(data.firstTask);
      expect(fileContent).to.contain(data.secondTask);
      expect(fileContent).to.contain(data.thirdTask);
      expect(fileContent).to.contain(data.fourthTask);
      expect(fileContent).to.contain(data.fifthTask);
    });
  });  
});


  


