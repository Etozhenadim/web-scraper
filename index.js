const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    // Serve a simple HTML form for entering a URL
    res.send(`
    <form method="post" action="/scrape">
      <input type="text" name="url">
      <button type="submit">Scrape</button>
    </form>
  `);
});

app.post('/scrape', async (req, res) => {
    // Get the URL to scrape from the request body
    const url = req.body.url;

    // Launch a new browser instance
    const browser = await puppeteer.launch();

    // Open a new page
    const page = await browser.newPage();

    // Navigate to the specified URL
    await page.goto(url);

    // Extract data from the website
    const title = await page.title();

    // Close the browser
    await browser.close();

    // Send the scraped data to the front-end
    res.send(`<h1>The title of the page is: ${title}</h1>`);
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
