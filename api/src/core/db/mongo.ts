import { connect } from "mongoose";

export async function dbConnect() {
  const DB_URI = process.env.NODE_ENV === 'production'
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_DEV;
  await connect(DB_URI!);
}

