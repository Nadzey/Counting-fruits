/// <reference types="cypress" />

class FruitsPage {
    constructor() {
    };

    countSizeFromCsv() {
      return cy.task("readFromCsv").then(res => {
        const sizes = res.map(item => Number(item["size"]));
        const totalSize = sizes.reduce((acc, el) => acc + el, 0);
        return totalSize;
      });
      };

    countNumbersOfEachFruits(){
      return cy.task("readFromCsv").then(res => {
        const fruits = res.map(item => item["name"]);
        const numbersOfFruits = fruits.reduce((acc, fruit) => {
          if (!acc[fruit]) {
            acc[fruit] = 1;
          } else {
            acc[fruit]++;
          }
          return acc;
        }, {});
        return numbersOfFruits;
      })
    }

      typesOfFruitsFromCsv() {
        return cy.task("readFromCsv").then(res => {
          const uniqueFruitTypes = [...new Set(res.map(item => item["name"]))];
          const totalUniqueFruitTypes = uniqueFruitTypes.length;
          return totalUniqueFruitTypes;
        });
      };

      writeAllDataToCsv(totalSize, totalUniqueFruitTypes, numbersOfFruits) {
        const numbersOfFruitsString = JSON.stringify(numbersOfFruits);
        const lines = [];
        for (const fruit in numbersOfFruits) {
          lines.push(`${fruit}: ${numbersOfFruits[fruit]}`);
        }
        const numbersOfFruitsLines = lines.join(', ');

        const dataToWrite = [
          { name: "Total number of fruit: ", amount: totalSize },
          { name: "Total types of fruit: ", amount: totalUniqueFruitTypes },
          { name: "The number of each type of fruit in descending order: ", amount: numbersOfFruitsLines}
        ];
      
        return cy.task("writeToCSV", {
          name: 'results',
          rows: dataToWrite
        });
      }
        
};

const fruitsPage = new FruitsPage();
export default fruitsPage;