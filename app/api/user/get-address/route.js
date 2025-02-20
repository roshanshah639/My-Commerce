import connectDB from "@/config/connectDb";
import AddressModel from "@/models/address.models";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // get user id
    const { userId } = getAuth(request);

    // connect to db
    await connectDB();

    // find the user
    const addresses = await AddressModel.find({ userId });

    // return the success response
    return NextResponse.json({
      success: true,
      addresses,
      message: "User address fetched successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
