import mongoose from 'mongoose';

async function connectDatabase() {
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    throw new Error('Debe definir la variable de entorno MONGODB_URI');
  }

  await mongoose.connect(MONGODB_URI);
  console.log('Conexion a MongoDB establecida');
}

export { connectDatabase };
