const { Builder } = require('selenium-webdriver');
const LoginPage = require('./WebComponent/LoginPage');
const ValidateAddItemPage = require('./WebComponent/ValidateAddItem');
const assert = require('assert');

describe('TestCase 2', function () {

    this.timeout(40000);
    let driver;

    ///Run pada awal test, hanya satu kali paling awal
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        
    });

    beforeEach(async function(){
        const loginPage = new LoginPage(driver);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');

    });

    //assertion

    it('Tambahin item berhasil dan sudah masuk di shopping cart', async function (){
        const validateAddItemPage = new ValidateAddItemPage(driver);
        const item = await validateAddItemPage.isOnAddtoCart();
        assert.strictEqual(item, 'Sauce Labs Backpack', 'Bukan item yang ditambakan')

    })

    after(async function (){
        await driver.quit();
        
    });

})