import mongoose from "mongoose";
const { Schema } = mongoose;

const LineSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    truck: {
      type: Schema.Types.ObjectId,
      ref: "Truck",
      required: true,
    },
    trailer: {
      type: Schema.Types.ObjectId,
      ref: "Trailer",
      default: null,
    },
    driver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    departLocation: String,
    arriveLocation: String,
    status: {
      type: String,
      enum: ["a_faire", "en_cours", "termine"],
      default: "a_faire",
    },
    kilometrageDepart: {
      type: Number,
      default: null,
    },
    kilometrageArrive: {
      type: Number,
      default: null,
    },
    fuelLiters: {
      type: Number,
      default: 0,
    },
    pdfUrl: {
      type: String,
      default: null,
    },
    driverNotes: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);
const Line = mongoose.model("Line", LineSchema);
export default Line;
