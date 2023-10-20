/// <reference types="cypress" />

class FruitsPage {
    constructor() {
    };

    countSizeFromCsv() {
      return cy.task("readFromCsv").then(res => {
        const sizes = res.map(item => Number(item["size"]));
        const totalSize = sizes.reduce((acc, el) => acc + el, 0);
        console.log(totalSize)
        return totalSize;
      });
      };

      typesOfFruitsFromCsv() {
        return cy.task("readFromCsv").then(res => {
          const uniqueFruitTypes = [...new Set(res.map(item => item["name"]))];
          const totalUniqueFruitTypes = uniqueFruitTypes.length;
          console.log(totalUniqueFruitTypes)
          return totalUniqueFruitTypes;
        });
      };

      writeAllDataToCsv(totalSize, totalUniqueFruitTypes) {
        const dataToWrite = [
          { name: "Total number of fruit: ", amount: totalSize },
          { name: "Total types of fruit: ", amount: totalUniqueFruitTypes },
        ];
      
        return cy.task("writeToCSV", {
          name: 'results',
          rows: dataToWrite
        });
      }
        
};

const fruitsPage = new FruitsPage();
export default fruitsPage;