/// <reference types="cypress" />

class FruitsPage {
    constructor() {
    };

    countSizeFromCsv() {
      return cy.task("readFromCsv").then(res => {
        const totalByName = {};
    
        res.forEach(item => {
          const name = item["name"];
    
          if (!totalByName[name]) {
            totalByName[name] = 1;
          } else {
            totalByName[name] += 1;
          }
        });
    
        const totalCount = Object.values(totalByName).reduce((acc, count) => acc + count, 0);
        console.log(totalCount);
        return totalCount;
      });
    }
    
    

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
    
        const sortedEntries = Object.entries(totalSize)
          .sort((a, b) => b[1] - a[1]);
    
        const lines = sortedEntries.map(([fruit, size]) => `${fruit}: ${size}`);
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
    
          if (!characteristics[fruitName]) {
            characteristics[fruitName] = {
              count: 1,
              colors: [color],
              shapes: [shape],
              sizes: [size],
            };
          } else {
            characteristics[fruitName].count += 1;
            if (!characteristics[fruitName].colors.includes(color)) {
              characteristics[fruitName].colors.push(color);
            }
            if (!characteristics[fruitName].shapes.includes(shape)) {
              characteristics[fruitName].shapes.push(shape);
            }
            characteristics[fruitName].sizes.push(size);
          }
        });
    
        const outputMessage = Object.entries(characteristics)
          .map(([fruit, charData]) => {
            const { count, colors, shapes, sizes } = charData;
            return `${count} ${fruit}: Shapes: ${shapes.join(", ")}, Colors: ${colors.join(", ")}, Sizes: ${sizes.join(", ")}`;
          })
          .join(";\n");
    
        return outputMessage;
      });
    }
     
    countInTheBasketOverThreeDays() {
      return cy.task("readFromCsv").then((res) => {
        const basket = {};
    
        res.forEach((item) => {
          const fruitName = item["name"];
          const days = Number(item["days"]);
    
          if (days > 3) {
            if (!basket[fruitName]) {
              basket[fruitName] = 1;
            } else {
              basket[fruitName] += 1;
            }
          }
        });
    
        const outputMessage = Object.entries(basket)
          .map(([fruit, count]) => `${count} ${fruit}`)
          .join(" and ");
        return outputMessage;
      });
    }
    
    
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
