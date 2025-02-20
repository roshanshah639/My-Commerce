import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "User id is required"],
      ref: "User",
    },
    fullName: {
      type: String,
      required: [true, "Full Name is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is required"],
    },
    pincode: {
      type: Number,
      required: [true, "Pincode is required"],
    },
    area: {
      type: String,
      required: [true, "Area is required"],
    },
    city: {
      type: String,
      required: [true, "City is requiresd"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
  },
  { timestamps: true }
);

const AddressModel =
  mongoose.models.Address || mongoose.model("Address", addressSchema);

export default AddressModel;
