// Script para verificar a string de conexão do MongoDB
require("dotenv").config();

console.log("\n" + "=".repeat(60));
console.log("🔍 VERIFICANDO CONFIGURAÇÃO DO MONGODB");
console.log("=".repeat(60) + "\n");

let MONGODB_URI = process.env.MONGODB_URI;

if (
  !MONGODB_URI ||
  MONGODB_URI === "SUA_STRING_DE_CONEXAO_AQUI" ||
  MONGODB_URI.trim() === ""
) {
  console.log("⚠️  MONGODB_URI não encontrado no arquivo .env");
  console.log("📝 String padrão que será usada:");
  console.log("   mongodb://localhost:27017/health-on-time\n");
  console.log("💡 Se você está usando MongoDB Atlas, você precisa:");
  console.log("   1. Acessar https://www.mongodb.com/cloud/atlas");
  console.log("   2. Ir em 'Connect' → 'Connect your application'");
  console.log("   3. Copiar a connection string");
  console.log("   4. Criar um arquivo .env com: MONGODB_URI=sua-string-aqui\n");
} else {
  console.log("✅ MONGODB_URI encontrado!");
  console.log("\n📋 Sua string de conexão (mascarada por segurança):");
  const maskedUri = MONGODB_URI.replace(/\/\/.*@/, "//***:***@");
  console.log("   " + maskedUri);
  console.log("\n📋 String completa para copiar (CUIDADO: contém senha!):");
  console.log("   " + MONGODB_URI);
  console.log("\n💡 Para usar no outro PC:");
  console.log("   1. Copie a string acima");
  console.log("   2. Crie um arquivo .env no outro PC");
  console.log("   3. Cole: MONGODB_URI=" + MONGODB_URI);
  console.log(
    "   4. Adicione também: JWT_SECRET=" +
      (process.env.JWT_SECRET || "jwt-secret-key-change-in-production")
  );
  console.log("   5. Adicione também: PORT=" + (process.env.PORT || "3000"));
}

console.log("\n" + "=".repeat(60) + "\n");
