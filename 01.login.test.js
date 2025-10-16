const { Builder, By, until } = require("selenium-webdriver");

// Describimos el conjunto de pruebas para Login
describe("Prueba de Funcionalidad de Login", () => {
  let driver;
  // Función para pausar (esperar en milisegundos)
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Inicializa el driver antes de cada prueba (opcional, pero útil)
  beforeEach(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  // Cierra el driver después de cada prueba
  afterEach(async () => {
    await driver.quit();
  });

  // Definición de la prueba de login
  test("Debe iniciar sesión correctamente y redirigir a /admin", async () => {
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

    // 🌟 ASERCIÓN DE JEST 🌟
    // Esperar la redirección a /admin
    await driver.wait(until.urlContains("/admin"), 2000);

    // Obtener la URL actual y verificar que contenga "/admin"
    const currentUrl = await driver.getCurrentUrl();
    await wait(3000); // Para que el profesor lo vea antes de la aserción

    // Si la URL contiene "/admin", la prueba pasa. Si falla el `driver.wait` anterior o esta aserción, Jest marca la prueba como fallida.
    expect(currentUrl).toContain("/admin");
  }, 30000); // 30 segundos de timeout para la prueba (por si acaso es lento)
});
