/// <reference types="cypress" />
import fruitsPage from '../pageObject/fruitsPage.js';

describe('Counting fruits data from csv file', () => {
    it("AT_001.001 | should return result in csv file", () => {
        fruitsPage.getDataFromCsv().then(totalSize => {
        fruitsPage.addDataToCsv(totalSize);
      });
    });
  });
  


