const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function SauceDemoUserLogin(){
    //Membuat koneksi dengan Browser Driver
    let driver = await new Builder().forBrowser('chrome').build();

    //Exception handling & Conclusion
    try {
        //Buka URL di browser
        await driver.get("https://www.saucedemo.com");
        
        //Masukkan Username dan Password
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');

        //Click Button Login
        await driver.findElement(By.id('login-button')).click();

        //Mencari kata "Swag Labs" di dashboard
        let titleText = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
        assert.strictEqual(titleText.includes('Swag Labs'), true, "Judul tidak tercantum 'Swag Labs'");

        //Mencari Burger Button yang ada di dashboard
        let menuButton = await driver.findElement(By.id('react-burger-menu-btn'));
        assert.strictEqual(await menuButton.isDisplayed(), true, "Tidak ada burger button");

    } finally {
        // await driver.quit();

    }
    
}

SauceDemoUserLogin();