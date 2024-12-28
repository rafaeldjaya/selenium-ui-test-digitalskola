const { By } = require('selenium-webdriver')

class ValidateAddItemPage {
    constructor (driver){
        this.driver = driver;
        this.itemAdded = By.id('add-to-cart-sauce-labs-backpack');
        this.clickMenu = By.id('shopping_cart_container')
    }

    async isOnAddtoCart(){
        //Klik add item
        await this.driver.findElement(this.itemAdded).click();
        //Klik menu shopping cart
        await this.driver.findElement(this.clickMenu).click();
        //Cek item tersebut sudah ditambahkan
        const item = await this.driver.findElement(By.className('inventory_item_name'));
        return item.getText();
    }
}

module.exports = ValidateAddItemPage;