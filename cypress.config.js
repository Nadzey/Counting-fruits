const { defineConfig } = require("cypress");
const csv = require('@fast-csv/parse');
const { writeToPath } = require('@fast-csv/format');

module.exports = defineConfig({
  viewportWidth: 1920,
   viewportHeight: 1080,
   chromeWebSecurity: false,
   defaultCommandTimeout: 7000,
   waitForNavigation: true,
   reporter: 'cypress-mochawesome-reporter',
e2e: {
   setupNodeEvents(on, config) {
   screenshotOnRunFailure=true;
   require('cypress-mochawesome-reporter/plugin')(on);
   on("task", {
    readFromCsv()
    {
      return new Promise(resolve => {
        let dataArray = [];
        csv.parseFile("basket.csv", {headers: true})
        .on('data', (data) => {
          dataArray.push(data);
        })
        .on('end', () => {
          resolve(dataArray)
        })
      })
    }
   });

   on("task", {
    writeToCSV({ name, rows }) {
      return new Promise((resolve, reject) => {
        writeToPath(`./${name}.csv`, rows)
          .on("finish", () => {
            resolve(null); 
          })
          .on("error", (error) => {
            reject(error); 
          });
      });
    }
  });  
 },
},  
});
