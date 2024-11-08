import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const DatabaseConnection = async () => {
  if(mongoose.connection.readyState>=1){
    return mongoose.connection.asPromise();
  }
  try {
   return await mongoose.connect(process.env.MONGO_URL as string);
   
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json({ error: "Failed to connect to database" }, { status: 500 });
  }
};
