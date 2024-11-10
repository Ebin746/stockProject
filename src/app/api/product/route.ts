import Product from "@/models/Product";
import { DatabaseConnection } from "@/mongo/route";
import { NextRequest, NextResponse } from "next/server";
import { Iproducts } from "@/app/page";

export const POST = async (req: NextRequest) => {
  await DatabaseConnection(); // Ensure database connection before operations

  try {
    const body = await req.json();
    const { productName, category, price, quantity }: Iproducts = body;

    // Check if any of the required fields are missing
    if (!productName || !category || !price || !quantity) {
      return NextResponse.json(
        { message: "Required data is missing. Please provide all fields." },
        { status: 400 }
      );
    }

    // Create and save new product data
    const newProduct = new Product({
      productName,
      category,
      price,
      quantity,
    });

    await newProduct.save();
    return NextResponse.json(
      { message: "Your data is saved successfully.", data: newProduct },
      { status: 201 }
    );
  } catch (error:any) {
    console.error("Error saving product data:", error);
    return NextResponse.json(
      { message: "An error occurred while saving data.", error: error.message },
      { status: 500 }
    );
  }
};
