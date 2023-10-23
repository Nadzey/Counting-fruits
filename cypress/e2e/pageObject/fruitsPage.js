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

    typesOfFruitsFromCsv() {
      return cy.task("readFromCsv").then(res => {
        const uniqueFruitTypes = [...new Set(res.map(item => item["name"]))];
        const totalUniqueFruitTypes = uniqueFruitTypes.length;
        return totalUniqueFruitTypes;
      });
    };

    countNumbersOfEachFruits() {
      return cy.task("readFromCsv").then((res) => {
        const totalSize = {};
    
        res.forEach((item) => {
          const name = item.name;
          const size = Number(item.size);
    
          if (!totalSize[name]) {
            totalSize[name] = size;
          } else {
            totalSize[name] += size;
          }
        });
    
        const fruitSizeArray = Object.entries(totalSize);
    
        fruitSizeArray.sort((a, b) => b[1] - a[1]);
    
        const lines = fruitSizeArray.map(([fruit, size]) => `${fruit}: ${size}`);
        const totalSizeLines = lines.join(', ');
    
        return totalSizeLines;
      });
    }
    

    characteristicsOfFruits() {
      return cy.task("readFromCsv").then((res) => {
        const characteristics = {};
    
        res.forEach(item => {
          const fruitName = item["name"];
          const color = item["color"];
          const shape = item["shape"];
          const size = Number(item["size"]);
    
          const uniqueKey = fruitName;
    
          if (!characteristics[uniqueKey]) {
            characteristics[uniqueKey] = {
              size,
              colors: [color],
              shapes: [shape],
            };
          } else {
            characteristics[uniqueKey].size += size;
    
            if (!characteristics[uniqueKey].colors.includes(color)) {
              characteristics[uniqueKey].colors.push(color);
            }
    
            if (!characteristics[uniqueKey].shapes.includes(shape)) {
              characteristics[uniqueKey].shapes.push(shape);
            }
          }
        });
    
        const outputMessage1 = Object.entries(characteristics)
          .map(([fruitName, charData]) => {
            const { size, colors, shapes } = charData;
            return `${size} ${fruitName}: ${colors.join(', ')}, ${shapes.join(', ')}`;
          })
          .join(";\n");
    
        return outputMessage1;
      });
    }
    
    
     
    countInTheBasketOverThreeDays() {
      return cy.task("readFromCsv").then((res) => {
        const basket = {};
    
        res.forEach((item) => {
          const fruitName = item["name"];
          const days = Number(item["days"]);
          const size = Number(item["size"]);
    
          if (days > 3) {
            if (!basket[fruitName]) {
              basket[fruitName] = size;
            } else {
              basket[fruitName] += size;
            }
          }
        });
    
        const outputMessage = Object.entries(basket)
          .map(([fruit, size]) => `${size} ${fruit}`)
          .join(" and ");
        return outputMessage;
      });
    };
    
    writeAllDataToCsv(totalSize, totalUniqueFruitTypes, totalSizeLines, outputMessage1, outputMessage) {
    
      const dataToWrite = [
        { name: "Total number of fruit: ", amount: totalSize },
        { name: "Total types of fruit: ", amount: totalUniqueFruitTypes },
        { name: "The number of each type of fruit in descending order: ", amount: totalSizeLines },
        { name: "The characteristics of each fruit by type: ", amount: outputMessage1 },
        { name: "Have any fruit been in the basket for over 3 days: ", amount: outputMessage },
      ];
    
      return cy.task("writeToCSV", {
        name: 'results',
        rows: dataToWrite
      });
    };
    
    checkFileContent() {
      return cy.task("readFromNewCsv").then(fileContent => {
        const fileContentString = fileContent.join('\n');
        console.log(fileContentString)
        return fileContentString;
    });
  };
};

const fruitsPage = new FruitsPage();
export default fruitsPage;
