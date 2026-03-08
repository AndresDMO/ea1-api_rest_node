import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { connectDatabase } from '../config/database.js';
import Genre from '../models/genre.model.js';
import Type from '../models/type.model.js';

dotenv.config();

const initialGenres = ['Accion', 'Aventura', 'Ciencia Ficcion', 'Drama', 'Terror'];
const initialTypes = ['Serie', 'Pelicula'];

async function seedGenres() {
  for (const genreName of initialGenres) {
    await Genre.updateOne(
      { name: genreName },
      { $set: { name: genreName, status: 'Active' } },
      { upsert: true }
    );
  }
}

async function seedTypes() {
  for (const typeName of initialTypes) {
    await Type.updateOne(
      { name: typeName },
      { $set: { name: typeName } },
      { upsert: true }
    );
  }
}

async function runSeed() {
  try {
    await connectDatabase();
    await seedGenres();
    await seedTypes();

    console.log('Seed finalizado: generos y tipos listos');
  } catch (error) {
    console.error('Error al ejecutar seed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log('Conexion a MongoDB cerrada');
  }
}

runSeed();
