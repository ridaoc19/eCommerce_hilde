import { connect } from "mongoose";

export async function dbConnect() {
  const DB_URI = process.env.DB_URI!;
  await connect(DB_URI);
}

