/// <reference types="cypress" />

class FruitsPage {
    constructor() {
    };


    getDataFromCsv() {
        return cy.task("readFromCsv").then(res => {
          let result = [];
          for (let i = 0; i < res.length; i++) {
            let size = Number(res[i]["size"]); 
            result.push(size);
          }
          let totalSize = result.reduce((acc, el) => acc + el, 0);
          return totalSize;
        });
      }
      
      addDataToCsv() {
        return this.getDataFromCsv().then(totalSize => {
          const dataToWrite = [{ name: "Total number of fruit: ", amount: totalSize }];
      
          return cy.task("writeToCSV", {
            name: 'results', 
            rows: dataToWrite
          });
        });
      }
      
};

const fruitsPage = new FruitsPage();
export default fruitsPage;