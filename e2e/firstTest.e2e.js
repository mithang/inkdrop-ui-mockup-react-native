const { tapId, tapText, typeToTextField } = require('./step-defination')
describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp()
  })

  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it('Tap tren button đăng việc', async () => {
    await tapId('DetailScreen')
    await tapId('AccountScreen')
    await tapId('SupportScreen')
    await element(by.id('HomeScreen')).tap()

    await element(by.id('btnDangViec')).tap()
    await element(by.id('Change')).tap()
    await element(by.id('text1')).typeText('31/5 Hoàng Hoa Thám')
    await element(by.id('text2')).typeText('Hồ Chí Minh')
    await element(by.id('text3')).typeText('Tân Bình')
    await element(by.id('PressInThis')).tap()
    await tapId('duration0')
    await tapId('week0')
    // await element(by.id('textAdress')).typeText('mua theo nuoc rua nha')
    await typeToTextField('textAdress', 'Mang theo chỗ lau nhà')
    await element(by.id('btnTieptheo')).tap()
    await element(by.id('btnPayment')).tap()
  })
})
