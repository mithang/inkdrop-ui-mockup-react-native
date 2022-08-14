describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Tap tren button đăng việc', async () => {
    await element(by.id("btnDangViec")).tap();
    await element(by.id("textAdress")).typeText('mua theo nuoc rua nha');
    await element(by.id("btnTieptheo")).tap();
    await element(by.id("btnPayment")).tap();
    
  });

 
});
