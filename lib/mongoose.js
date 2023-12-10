import mongoose from "mongoose";

export function mongooseConnect() {
  return new Promise((resolve, reject) => {
    const db = mongoose.connection;

    // If the connection is already open, resolve with the existing connection
    if (db.readyState === 1) {
      resolve(db);
    } else {
      // Connect to MongoDB and handle success and error cases
      const uri = process.env.MONGODB_URI;
      mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          console.log("Connected to MongoDB");
          resolve(mongoose.connection);
        })
        .catch((error) => {
          console.error("Error connecting to MongoDB:", error);
          reject(error);
        });
    }
  });
}
