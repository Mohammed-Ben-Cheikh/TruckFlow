import mongoose from "mongoose";
const { Schema } = mongoose;

const TireSchema = new Schema(
  {
    reference: {
      type: String,
      required: true,
      unique: true,
    },
    brand: String,
    kilometrageStart: {
      type: Number,
      default: 0,
    },
    kilometrageCurrent: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["good", "warning", "replace"],
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