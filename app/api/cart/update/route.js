import connectDB from "@/config/connectDb";
import UserModel from "@/models/user.models";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // get user id
    const { userId } = getAuth(request);

    // get card data
    const { cartData } = await request.json();

    // connect to db
    await connectDB();

    // find the user
    const user = await UserModel.findById(userId);

    // if user is not found
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    // update the user
    user.cartItems = cartData;

    // save updated user
    await user.save();

    // return the success response
    return NextResponse.json({
      success: true,
      message: "Cart Updated successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
