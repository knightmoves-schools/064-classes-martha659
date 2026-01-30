const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { assert } = require("console");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe('the index.js file', () => {
  it("should define a class named Person that takes two parameters: firstName and lastName when it's created", async function() {
        const person = await page.evaluate(() => {
          return new Person('testFirst', 'testLast');
        });

        expect(person).toBeDefined();
    });

    it('should create a list named `guests` that contains three instances of the `Person` class', async function () {
        const guests = await page.evaluate(() => guests );
        const person = await page.evaluate(() => new Person('', '') );
        
        expect(guests).toBeDefined();
        expect(guests.length).toBe(3);
        expect(guests[0].constructor.name).toBe(person.constructor.name);
        expect(guests[1].constructor.name).toBe(person.constructor.name);
        expect(guests[2].constructor.name).toBe(person.constructor.name);
    });
});

