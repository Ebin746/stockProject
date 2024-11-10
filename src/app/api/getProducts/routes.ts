import { DatabaseConnection } from "@/mongo/route";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  await DatabaseConnection();

  try {
    const data = await Product.find();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching product data:", error);

    return NextResponse.json(
      { message: "An error occurred while fetching data." },
      { status: 500 }
    );
  }
};
