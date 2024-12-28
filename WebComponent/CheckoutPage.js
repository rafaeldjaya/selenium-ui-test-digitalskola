const { By } = require('selenium-webdriver')

class CheckoutPage {
    constructor (driver){
        this.driver = driver;
        this.itemAdded = By.id('add-to-cart-sauce-labs-backpack');
        this.clickMenu = By.id('shopping_cart_container');
        this.clickCheckout = By.id('checkout');
        this.firstNameInput = By.id('first-name');
        this.lastNameInput = By.id('last-name');
        this.postalCodeInput = By.id('postal-code');
        this.continue = By.id('continue');
    }

    async additem(firstname, lastname, postalcode){
        //Klik add item
        await this.driver.findElement(this.itemAdded).click();
        //Klik menu shopping cart
        await this.driver.findElement(this.clickMenu).click();
        //Checkout barang
        await this.driver.findElement(this.clickCheckout).click();
        //isi data
        await this.driver.findElement(this.firstNameInput).sendKeys(firstname);
        await this.driver.findElement(this.lastNameInput).sendKeys(lastname);
        await this.driver.findElement(this.postalCodeInput).sendKeys(postalcode);
        await this.driver.findElement(this.continue).click();
        //Cek sudah sampai halaman konfirmasi pembelian
        const item = await this.driver.findElement(By.className('inventory_item_name'));
        return item.getText();
    }

}

module.exports = CheckoutPage;