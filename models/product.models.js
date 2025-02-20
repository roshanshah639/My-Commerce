import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "User id is required"],
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Product Name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      trim: true,
    },
    offerPrice: {
      type: Number,
      required: [true, "Offer Price is required"],
      trim: true,
    },
    image: {
      type: Array, // cloudinary url
      required: [true, "Images are required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
  },
  { timestamps: true }
);

const ProductModel =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default ProductModel;
