const { Builder } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage');
const CheckoutPage = require('../WebComponent/CheckoutPage');
const assert = require('assert');
const fs = require('fs');
const { userInfo } = require('os');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;
const firstname = process.env.FIRST_NAME;
const lastname = process.env.LAST_NAME;
const postalcode = process.env.POSTAL_CODE;

const screenshotsDir = './screenshots/';
if(!fs.existsSync(screenshotsDir)){
    fs.mkdirSync(screenshotsDir, {recursive: true});
}

describe('TestCase 3 #Regression #Smoke', function () {

    this.timeout(40000);
    let driver;

    switch(browser.toLowerCase()){
        case 'firefox':
            const firefox = require('selenium-webdriver/firefox');
            options = new firefox.Options();
            options.addArguments('--headless');
        case 'chrome':
        default:
            const chrome = require('selenium-webdriver/chrome');
            options = new chrome.Options();
            options.addArguments('--headless');
            break;
    }

    ///Run pada awal test, hanya satu kali paling awal
    before(async function () {
        driver = await new Builder().forBrowser(browser).setFirefoxOptions(options).build();
        
    });

    beforeEach(async function(){
        const loginPage = new LoginPage(driver);
        const checkoutPage = new CheckoutPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login(username, password);
        await checkoutPage.additem(firstname, lastname, postalcode);

    });

    //assertion

    it('Berhasil sampai halaman konfirmasi', async function (){
        const checkoutPage = new CheckoutPage(driver);
        const item = await checkoutPage.additem();
        assert.strictEqual(item, 'Sauce Labs Backpack', 'Bukan item yang ditambakan')

    })


    afterEach(async function () { 
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotsDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`;
        fs.writeFileSync(filepath, screenshot, 'base64');
    });

    after(async function (){
        await driver.quit();
        
    });

})