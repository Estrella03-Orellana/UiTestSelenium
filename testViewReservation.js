// testViewReservation.js

const { Builder, By, Key, until } = require("selenium-webdriver");

async function testViewReservation() {
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    // 1️⃣ Ir a la página de login
    await driver.get("http://localhost:3000/login");
    await driver.manage().window().maximize();
    console.log("🌐 Página de login abierta");
    await driver.sleep(3000);

    // 2️⃣ Esperar el campo de usuario y escribir credenciales
    const emailField = await driver.wait(
      until.elementLocated(By.name("username")),
      10000
    );
    await emailField.sendKeys("minor@gmail.com");
    await driver.sleep(3000);

    const passwordField = await driver.findElement(By.name("password"));
    await passwordField.sendKeys("12345", Key.RETURN);
    console.log("🔑 Credenciales ingresadas, iniciando sesión...");
    await driver.sleep(3000);

    // 3️⃣ Esperar que cargue el panel de control
    await driver.wait(
      until.elementLocated(By.xpath("//h1[contains(., 'Panel de Control')]")),
      10000
    );
    console.log("✅ Login exitoso y panel de control cargado");
    await driver.sleep(3000);

    // 4️⃣ Clic en 'Config. Reservas'
    const reservasCard = await driver.wait(
      until.elementLocated(
        By.xpath("//h3[contains(., 'Config. Reservas')]/ancestor::a")
      ),
      10000
    );
    await reservasCard.click();
    console.log("🧭 Clic en 'Config. Reservas' realizado");
    await driver.sleep(3000);

    // 5️⃣ Esperar que cargue la lista de reservas
    await driver.wait(
      until.elementLocated(
        By.xpath("//h2[contains(., 'Listado de Reservas')]")
      ),
      10000
    );
    console.log(
      "📋 Página de reservas cargada con título: Listado de Reservas"
    );
    await driver.sleep(3000);

    // 6️⃣ Esperar que el primer link "Ver" esté presente
    const viewLinks = await driver.wait(
      until.elementsLocated(By.xpath("//a[contains(text(), 'Ver')]")),
      10000
    );

    if (viewLinks.length === 0) {
      throw new Error("No se encontró ningún link 'Ver Detalles'");
    }

    await viewLinks[0].click();
    console.log("🔍 Abriendo detalles de la primera reserva...");
    await driver.sleep(3000);

    // 7️⃣ Esperar que cargue el detalle de la reserva
    await driver.wait(
      until.elementLocated(
        By.xpath("//h2[contains(., 'Detalles de la Reserva')]")
      ),
      10000
    );
    console.log("✅ Detalles de la reserva cargados correctamente");
    await driver.sleep(3000);

    // 8️⃣ Capturar algún dato de la reserva
    const totalField = await driver.findElement(
      By.xpath("//li[strong[contains(text(), 'Total:')]]/span")
    );
    const totalText = await totalField.getText();
    console.log("💰 Total de la reserva:", totalText);
    await driver.sleep(3000);
  } catch (error) {
    console.error("❌ Error durante la prueba de ver detalles:", error);
  } finally {
    console.log("🔚 Cerrando navegador en 3 segundos...");
    await driver.sleep(3000);
    await driver.quit();
  }
}

testViewReservation();
