const { execSync } = require("child_process");

const tests = [
  { name: "Login", cmd: "npm run test:login" },
  { name: "Ver Detalles", cmd: "npm run test:view" },
  { name: "Eliminar Reserva", cmd: "npm run test:delete" },
];

(async () => {
  for (const test of tests) {
    console.log(`\n🚀 Iniciando prueba: ${test.name}...\n`);
    try {
      execSync(test.cmd, { stdio: "inherit" });
      console.log(`✅ ${test.name} completada con éxito`);
    } catch (error) {
      console.error(`❌ Error en la prueba: ${test.name}`);
    }
  }
})();
