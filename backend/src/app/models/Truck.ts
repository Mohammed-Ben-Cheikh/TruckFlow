import mongoose from "mongoose";
const { Schema } = mongoose;

const TruckSchema = new Schema(
  {
    registration: {
      type: String,
      required: true,
      unique: true,
    },
    brand: String,
    model: String,

    status: {
      type: String,
      enum: ["available", "on_trip", "maintenance"],
      default: "available",
    },

    kilometrage: {
      type: Number,
      default: 0,
    },

    fuelConsumption: {
      average: { type: Number, default: 0 },
    },

    tires: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tire",
      },
    ],

    lastOilChangeKm: {
      type: Number,
      default: 0,
    },

    lastRevisionKm: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const Truck = mongoose.model("Truck", TruckSchema);
export default Truck;
