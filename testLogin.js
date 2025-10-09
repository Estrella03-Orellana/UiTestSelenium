const { Builder, By, until } = require("selenium-webdriver");

async function testLogin() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // 1. Ir a la app React
    await driver.get("http://localhost:3000");

    // 2. Escribir usuario y contraseña
    await driver.findElement(By.id("username")).sendKeys("usuario123");
    await driver.findElement(By.id("password")).sendKeys("12345");

    // 3. Hacer clic en el botón
    await driver.findElement(By.id("login-button")).click();

    // 4. Esperar (simular interacción)
    await driver.sleep(2000);

    console.log("✅ Prueba UI completada correctamente");
  } catch (error) {
    console.error("❌ Error en la prueba:", error);
  } finally {
    await driver.quit();
  }
}

testLogin();
