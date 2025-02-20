import connectDB from "@/config/connectDb";
import ProductModel from "@/models/product.models";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // connect to db
    await connectDB();

    // find all products
    const products = await ProductModel.find({});

    // return the success response
    return NextResponse.json({
      success: true,
      products,
      message: "Products fetched successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
