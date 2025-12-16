import mongoose from "mongoose";
const { Schema } = mongoose;

const TrackingSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    line: { type: Schema.Types.ObjectId, ref: "Line", default: null },
    vehicle: { type: Schema.Types.ObjectId, ref: "Truck", default: null },
    location: { type: String, default: null },
    lat: { type: Number, default: null },
    lon: { type: Number, default: null },
    timestamp: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

const Tracking = mongoose.model("Tracking", TrackingSchema);
export default Tracking;
