const { Given, When, Then, AfterAll } = require('@cucumber/cucumber')
const { Builder, By, Capabilities, Key } = require('selenium-webdriver')
const { expect } = require('chai')

const capabilities = Capabilities.chrome()
capabilities.set('chromeOptions', { w3c: false })

const driver = new Builder().withCapabilities(capabilities).build()

require('chromedriver')

Given('que estou na tela de {string}', async function (screenTitle) {
  try {
    driver.get('http://localhost:8000')
    const title = await driver
      .findElement(By.className('title'))
      .getAttribute('innerHTML')
    expect(title).to.contain(screenTitle)
  } catch (error) {
    throw error
  }
})

When(
  'preencho o campo de busca com o produto {string} e clico em buscar',
  async function (searchTerm) {
    try {
      const searchField = await driver.findElement(By.name('product'))
      searchField.sendKeys(searchTerm, Key.RETURN)
      searchField.submit()
    } catch (error) {
      throw error
    }
  }
)

Then(
  'recebo o resultado na página {string}, o produto {string} no valor de {string}',
  async function (screenTitle, productName, productPrince) {
    try {
      const title = await driver
        .findElement(By.className('title'))
        .getAttribute('innerHTML')
      const name = await driver
        .findElement(By.className('productName'))
        .getAttribute('innerHTML')
      const price = await driver
        .findElement(By.className('productPrice'))
        .getAttribute('innerHTML')

      // first one is not needed in this case, but..
      expect(title).to.contain(screenTitle)
      expect(name).to.contain(productName)
      expect(price).to.contain(productPrince)
    } catch (error) {
      throw error
    }
  }
)

AfterAll(async function () {
  await driver.quit()
})
