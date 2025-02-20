import connectDB from "@/config/connectDb";
import UserModel from "@/models/user.models";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // get user id
    const { userId } = getAuth(request);

    // connect to db
    await connectDB();

    // find the user
    const user = await UserModel.findById(userId);

    // if user is not found
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    // get cart items
    const { cartItems } = user;

    // return the success response
    return NextResponse.json({
      success: true,
      cartItems,
      message: "User fetched successfully",
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
