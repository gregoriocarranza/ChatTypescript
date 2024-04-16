import mongoose, { connect } from "mongoose";

export class MongoConfiguration {
  public static connectDB() {
    const DB_URI: string | undefined = process.env.MONGO_URI;
    mongoose.set("strictQuery", true);
    if (!DB_URI) {
      throw new Error("Mongo db uri missing");
    }
    connect(DB_URI)
      .then(() => {
        console.info(`Mongodb cluster connected`);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
