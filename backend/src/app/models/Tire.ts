import mongoose from "mongoose";
const { Schema } = mongoose;

const TireSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    reference: {
      type: String,
      required: true,
      unique: true,
    },
    brand: {
      type: String,
      required: true,
    },
    diameter: {
      type: Number,
      required: true,
    },
    kilometrageMax: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      default: null,
    },
    inUse: {
      type: Boolean,
      default: false,
    },
    used: {
      type: Boolean,
      default: false,
    },
    kilometrageCurrent: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["good", "warning", "critical"],
      default: "good",
    },
    mountedOn: {
      type: String,
      enum: ["truck", "trailer", null],
      default: null,
    },
    vehicleId: {
      type: Schema.Types.ObjectId,
      default: null,
    },
  },
  { timestamps: true }
);
const Tire = mongoose.model("Tire", TireSchema);
export default Tire;
