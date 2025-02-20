import connectDB from "@/config/connectDb";
import authSeller from "@/lib/authSeller";
import ProductModel from "@/models/product.models";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // get user id from request
    const { userId } = getAuth(request);

    // check if user is seller
    const isSeller = await authSeller(userId);

    // if user is not seller
    if (!isSeller) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized request: user is not seller",
      });
    }

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
