import mongoose from "mongoose";
const { Schema } = mongoose;

const TrailerSchema = new Schema(
  {
    registration: {
      type: String,
      required: true,
      unique: true,
    },
    type: String,
    status: {
      type: String,
      enum: ["available", "on_trip", "maintenance"],
      default: "available",
    },
    tires: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tire",
      },
    ],
    kilometrage: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const Trailer = mongoose.model("Trailer", TrailerSchema);
export default Trailer;
