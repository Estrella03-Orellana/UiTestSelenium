const { Builder, By, until } = require("selenium-webdriver");

async function testLogin() {
  let driver = await new Builder().forBrowser("chrome").build();

  // 👇 Función para pausar (esperar en milisegundos)
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  try {
    await driver.get("http://localhost:3000/login");

    // Esperar que aparezca el campo de usuario
    await driver.wait(until.elementLocated(By.name("username")), 5000);
    await wait(1000);

    // Escribir credenciales
    await driver.findElement(By.name("username")).sendKeys("minor@gmail.com");
    await wait(800);
    await driver.findElement(By.name("password")).sendKeys("12345");
    await wait(800);

    // Clic en el botón de login
    const loginButton = await driver.findElement(
      By.xpath("//button[contains(text(),'Iniciar Sesión')]")
    );
    await loginButton.click();

    // Esperar redirección
    await driver.wait(until.urlContains("/admin"), 8000);
    await wait(3000); // deja visible el dashboard

    console.log("✅ Prueba de login ejecutada correctamente");

    await wait(5000); // deja la vista abierta unos segundos antes de cerrar
  } catch (error) {
    console.error("❌ Error durante la prueba:", error);
    await wait(3000);
  } finally {
    await driver.quit();
  }
}

testLogin();
