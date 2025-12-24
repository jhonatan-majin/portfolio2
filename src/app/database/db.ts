import mongoose from "mongoose";

/**
 * En Next.js (Serverless), las variables globales se limpian en cada recarga.
 * Usamos 'global' para mantener la conexión activa entre llamadas a la API
 * durante el ciclo de vida del contenedor de la función.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connect = async () => {
  // 1. Verificar si la URL de conexión existe
  if (!process.env.MONGO_URL) {
    throw new Error("Por favor, define la variable MONGO_URL en tu archivo .env");
  }

  // 2. Si ya hay una conexión activa, retornarla
  if (cached.conn) {
    console.log("=> Usando conexión existente");
    return cached.conn;
  }

  // 3. Si no hay una promesa de conexión, crear una nueva
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Desactivar si quieres que falle rápido si no hay conexión
    };

    console.log("=> Creando nueva conexión a la base de datos...");
    
    mongoose.set("strictQuery", true);
    cached.promise = mongoose.connect(process.env.MONGO_URL, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    // 4. Esperar a que la promesa se resuelva
    cached.conn = await cached.promise;
    console.log("=> MongoDB conectado con éxito");
  } catch (e) {
    cached.promise = null;
    console.error("=> Error conectando a MongoDB:", e);
    throw e;
  }

  return cached.conn;
};