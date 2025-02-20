import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    _id: {
      type: String,
      required: [true, "User id is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Image url is required"],
    },
    cartItems: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true, minimize: false }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
