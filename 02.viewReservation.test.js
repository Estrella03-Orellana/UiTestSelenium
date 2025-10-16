const { Builder, By, Key, until } = require("selenium-webdriver");

describe("Prueba de Visualización de Reserva", () => {
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
  });

  afterEach(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test("Debe visualizar el detalle de la primera reserva y obtener su total", async () => {
    // 1️⃣ Login
    await driver.get("http://localhost:3000/login");
    const emailField = await driver.wait(
      until.elementLocated(By.name("username")),
      10000
    );
    await emailField.sendKeys("minor@gmail.com");
    const passwordField = await driver.findElement(By.name("password"));
    await passwordField.sendKeys("12345", Key.RETURN);

    // 2️⃣ Esperar el Panel de Control
    await driver.wait(until.urlContains("/admin"), 20000);

    // 3️⃣ Clic en 'Config. Reservas'
    const reservasCard = await driver.wait(
      until.elementLocated(
        By.xpath("//h3[contains(., 'Config. Reservas')]/ancestor::a")
      ),
      10000
    );
    await reservasCard.click();

    // 💡 AJUSTE CLAVE: Refuerzo de navegación (Pausa y verificación de URL)
    await driver.sleep(2000);
    await driver.wait(until.urlContains("/gestion/reservas"), 10000);

    // 4️⃣ Esperar la lista de reservas (Punto de fallo anterior)
    const listTitle = await driver.wait(
      until.elementLocated(By.xpath("//h2[text()='Listado de Reservas']")),
      20000 // Timeout alto
    );
    expect(await listTitle.isDisplayed()).toBe(true);

    // 5️⃣ Clic en el primer link "Ver"
    const viewLinks = await driver.wait(
      until.elementsLocated(By.xpath("//a[contains(text(), 'Ver')]")),
      10000
    );

    if (viewLinks.length === 0) {
      throw new Error("No se encontraron reservas para ver.");
    }

    await viewLinks[0].click();

    // Pausa extendida para esperar que se resuelvan las llamadas a la API
    await driver.sleep(3000);

    // 6️⃣ Esperar que cargue el detalle de la reserva (Título)
    const detailTitle = await driver.wait(
      until.elementLocated(
        By.xpath("//h2[contains(text(), 'Detalles de la Reserva')]")
      ),
      25000 // Timeout máximo
    );

    // 🌟 ASERCIÓN INTERMEDIA: Título de la página de detalles
    expect(await detailTitle.isDisplayed()).toBe(true);

    // 7️⃣ ASERCIÓN FINAL: Obtener y verificar el Total de la Reserva
    const totalSpan = await driver.wait(
      until.elementLocated(
        By.xpath("//li[strong[contains(text(), 'Total:')]]/span")
      ),
      10000
    );

    const totalText = await totalSpan.getText();
    expect(totalText).toMatch(/\$\d+\.\d{2}/);
  }, 50000); // Timeout total de prueba
});
