import mongoose, { connect } from "mongoose";

let cachedDB = null;

const connectToDatabase = async () => {
  const {
    MONGO_CONNECTION_TYPE,
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOST,
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
    'mongodb://localhost/merndb',
    mongoOptions
  );

  console.log('Connected to database');

  cachedDB = mongooseInstance;
};

export default connectToDatabase;
