import mongoose, { connect } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


let cachedDB = null;

const connectToDatabase = async () => {
  const {
    MONGO_CONNECTION_TYPE,
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DATABASE,
    MONGO_SSL,
  } = process.env;
  
  if (cachedDB) {
    const hasAConnection = mongoose.connections.find(
      (connection) => connection.readyState === 1
    );
    if (hasAConnection) {
      console.log('Reusing connection');
      return;
    }
  }

  mongoose.set('strictQuery', false);

  const mongoOptions = {
    serverSelectionTimeoutMS: 10000,
    ssl: false,
    authSource: 'admin',
    socketTimeoutMS: 10000,
    family: 4,
  };

  const mongooseInstance = await mongoose.connect(
    `${MONGO_CONNECTION_TYPE}://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`,
    mongoOptions
  );

  console.log('Connected to database');

  cachedDB = mongooseInstance;
};

export default connectToDatabase;
