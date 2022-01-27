var express = require('express');
const puppeteer = require('puppeteer');
var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {

    let results = [];

    async function data() {
        try {
            const URL = 'https://arbetsformedlingen.se/platsbanken/annonser?q=devops&l=2:CifL_Rzy_Mku'
            const browser = await puppeteer.launch()
            const page = await browser.newPage()

            await page.goto(URL)
            let data = await page.evaluate(() => {
                results = [];
                let items = document.querySelectorAll('.card-container')
                items.forEach((item) => {
                    results.push({
                        // url: item.getAttribute('href'),
                        title: item.querySelector('a').innerText,
                    })
                })  
                
                return results
              
            })

            console.log(data)
            res.send(data);
            await browser.close()

        } catch (error) {
            console.error(error)
        }
      
    }
   
    data();

});

module.exports = router;