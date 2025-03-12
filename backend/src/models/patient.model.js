import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
const patientSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    patientID: {
      type: String,
      unique: true, // Ensure uniqueness
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    weight: {
      type: Number,
      required: true,
      min: 0,
    },
    height: {
      type: Number,
      required: true,
      min: 0,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"], // Standard values
    },
    token: {
      type: String,
      default: "",
    },
    tokenValidity: {
      type: Date,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true, // Auto-generates createdAt and updatedAt fields
  }
);

patientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

patientSchema.methods.isPasswordCorrect = async function (password) {
  console.log(password, this.password);
  return await bcrypt.compare(password, this.password);
};

export const Patient = mongoose.model("Patient", patientSchema);
