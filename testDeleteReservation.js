const { Builder, By, until, Key } = require("selenium-webdriver");

async function testDeleteReservation() {
  const driver = await new Builder().forBrowser("chrome").build();
  const wait = (ms) => new Promise((res) => setTimeout(res, ms));

  try {
    // 1️⃣ Ir al login
    await driver.get("http://localhost:3000/login");
    await driver.findElement(By.name("username")).sendKeys("minor@gmail.com");
    await driver.findElement(By.name("password")).sendKeys("12345", Key.RETURN);

    // 2️⃣ Esperar al panel de control
    await driver.wait(until.urlContains("/admin"), 10000);
    console.log("✅ Login exitoso");
    await wait(3000);

    // 3️⃣ Clic en "Config. Reservas" (si existe un botón en panel)
    const reservasCard = await driver.findElement(
      By.xpath("//h3[contains(., 'Config. Reservas')]/ancestor::a")
    );
    await reservasCard.click();
    console.log("🧭 Clic en 'Config. Reservas' realizado");
    await wait(3000);

    // 4️⃣ Esperar la lista de reservas
    await driver.wait(
      until.elementLocated(
        By.xpath("//h2[contains(text(),'Listado de Reservas')]")
      ),
      10000
    );
    console.log("✅ Listado de reservas cargado");
    await wait(3000);

    // 5️⃣ Buscar el enlace "Eliminar" de la primera reserva
    const deleteLinks = await driver.findElements(
      By.xpath("//a[contains(@href,'/gestion/reservas/delete/')]")
    );

    if (deleteLinks.length === 0) {
      console.log("⚠️ No hay reservas para eliminar");
      return;
    }

    await deleteLinks[0].click();
    console.log("🗑️ Clic en 'Eliminar' de la primera reserva");
    await wait(3000);

    // 6️⃣ Esperar la página de confirmación
    await driver.wait(
      until.elementLocated(
        By.xpath("//h2[contains(text(),'Confirmar Eliminación')]")
      ),
      10000
    );
    console.log("✅ Página de confirmación visible");
    await wait(3000);

    // 7️⃣ Clic en el botón rojo "Eliminar"
    const confirmBtn = await driver.findElement(
      By.xpath("//button[contains(text(),'Eliminar')]")
    );
    await confirmBtn.click();
    console.log("✅ Reserva eliminada correctamente");
    await wait(3000);
  } catch (error) {
    console.error("❌ Error durante la prueba de eliminación:", error);
  } finally {
    await driver.quit();
  }
}

testDeleteReservation();
