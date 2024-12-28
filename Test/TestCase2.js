const { Builder } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage');
const ValidateAddItemPage = require('../WebComponent/ValidateAddItem');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

const screenshotsDir = './screenshots/';
if(!fs.existsSync(screenshotsDir)){
    fs.mkdirSync(screenshotsDir, {recursive: true});
}

describe('TestCase 2 #Regression #Smoke', function () {

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
        await loginPage.navigate(baseUrl);
        await loginPage.login(username, password);

    });

    //assertion

    it('Tambahin item berhasil dan sudah masuk di shopping cart', async function (){
        const validateAddItemPage = new ValidateAddItemPage(driver);
        const item = await validateAddItemPage.isOnAddtoCart();
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