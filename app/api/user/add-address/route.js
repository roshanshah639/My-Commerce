import connectDB from "@/config/connectDb";
import AddressModel from "@/models/address.models";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // get user id
    const { userId } = getAuth(request);

    // get address from request
    const { address } = await request.json();

    //  connect to db
    await connectDB();

    // create new address
    const newAddress = await AddressModel.create({
      ...address,
      userId,
    });

    // return the success response
    return NextResponse.json({
      success: true,
      newAddress,
      message: "Address added successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
