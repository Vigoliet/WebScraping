var express = require('express');
const puppeteer = require('puppeteer');
var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {

    let results = [];

    async function data() {
        try {
            const URL = 'https://arbetsformedlingen.se/platsbanken/annonser?ot=6YE1_gAC_R2G&q=devops&l=2:CifL_Rzy_Mku'
            const browser = await puppeteer.launch({headless: false})
            const page = await browser.newPage()

            await page.goto(URL)
            let pagesToScrape = 3;
            let currentPage = 1;
            let data = []
            while (currentPage <= pagesToScrape) {
                let newResults = await page.evaluate(() => {
                    let results = []
                    let items = document.querySelectorAll('.card-container')
                    items.forEach((item) => {
                        results.push({
                               // job
                             title: item.querySelector('a').innerText, // takes the inner text of the a-link attribute

                         // company name and location
                             companyname: item.querySelector('.pb-company-name').innerText,

                            date: item.querySelector('.ng-star-inserted').innerText,

                            url: item.querySelector('a').href, //takes the url 
                        })
                    })
                    return results
                })
                data = data.concat(newResults)
                if (currentPage < pagesToScrape) {
                    await page.click('.sc-digi-button-h .digi-button--icon-secondary.sc-digi-button')
                    await page.waitForSelector('.card-container')
                 //    await page.waitForSelector('.sc-digi-button')
                }
                currentPage++;
            }
            console.log(data)
            res.send(data)
            await browser.close()
        } catch (error) {
            console.error(error)
        }

    }

    data();
});

router.get('/more', function (req, res, next) {

async function tutorial() {
   try {
       const URL = 'https://arbetsformedlingen.se/platsbanken/annonser?ot=6YE1_gAC_R2G&q=devops&l=2:CifL_Rzy_Mku'
       const browser = await puppeteer.launch({headless: false})
       const page = await browser.newPage()

       await page.goto(URL)
       let pagesToScrape = 3;
       let currentPage = 1;
       let data = []
       while (currentPage <= pagesToScrape) {
           let newResults = await page.evaluate(() => {
               let results = []
               let items = document.querySelectorAll('.header-container>h3>a')
               items.forEach((item) => {
                   results.push({
                       url: item.href
                   })
               })
               return results
           })
           data = data.concat(newResults)
           if (currentPage < pagesToScrape) {
               await page.click('.sc-digi-button-h .digi-button--icon-secondary.sc-digi-button')
               await page.waitForSelector('.card-container')
              
           }
           currentPage++;
       }
       console.log(data)
       res.send(data)
       await browser.close()
   } catch (error) {
       console.error(error)
   }
}
tutorial()
});


module.exports = router;