import connectDB from "@/config/connectDb";
import authSeller from "@/lib/authSeller";
import ProductModel from "@/models/product.models";
import { getAuth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// clodinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
    
  try {
    // find user id
    const { userId } = getAuth(request);

    // check if user is seller or not
    const isSeller = await authSeller(userId);

    // if user is not seller
    if (!isSeller) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized request",
      });
    }

    const formData = await request.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");
    const price = formData.get("price");
    const offerPrice = formData.get("offerPrice");
    const files = formData.getAll("images");

    if (!files || files.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No files uploaded",
      });
    }

    // upload images on cloudinary
    const result = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              resource_type: "auto",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          stream.end(buffer);
        });
      })
    );

    // extract image url from result
    const image = result.map((result) => result.secure_url);

    // connect to db
    await connectDB();

    // create a new product
    const newProduct = await ProductModel.create({
      userId,
      name,
      description,
      category,
      price: Number(price),
      offerPrice: Number(offerPrice),
      image,
      date: Date.now(),
    });

    // return the success response
    return NextResponse.json({
      success: true,
      newProduct,
      message: "Product added successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
