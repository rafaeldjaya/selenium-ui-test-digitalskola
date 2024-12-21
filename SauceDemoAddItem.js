const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function SauceDemoAddItem(){
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

        //Click Button Add to cart 
        await driver.findElement(By.id('add-to-cart-sauce-labs-bike-light')).click();

        //Memastikan pada icon shopping cart ada muncul angka setelah ditambahkan
        let menuButton = await driver.findElement(By.xpath("//span[@class='shopping_cart_badge']"));
        assert.strictEqual(await menuButton.isDisplayed(), true, "Tidak tertampil angka setelah ditambahkan");
        

    } finally {
        // await driver.quit();

    }
    
}

SauceDemoAddItem();