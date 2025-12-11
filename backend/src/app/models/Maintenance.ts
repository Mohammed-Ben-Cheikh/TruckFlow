import mongoose from "mongoose";
const { Schema } = mongoose;

const MaintenanceSchema = new Schema(
  {
    vehicleType: {
      type: String,
      enum: ["truck", "trailer"],
      required: true,
    },

    vehicle: {
      type: Schema.Types.ObjectId,
      refPath: "vehicleType",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "oil_change",
        "revision",
        "tires_change",
        "general_check",
        "repair",
      ],
      required: true,
    },

    status: {
      type: String,
      enum: ["planned", "in_progress", "done", "canceled"],
      default: "planned",
    },

    description: {
      type: String,
      default: "",
    },

    plannedAtKm: {
      type: Number,
      required: false,
    },

    currentKm: {
      type: Number,
      default: null,
    },

    nextDueKm: {
      type: Number,
      default: null,
    },

    dateStart: {
      type: Date,
      default: null,
    },

    dateEnd: {
      type: Date,
      default: null,
    },

    cost: {
      type: Number,
      default: 0,
    },

    parts: [
      {
        name: String,
        price: Number,
        qty: Number,
      },
    ],

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    notes: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);
const Maintenance = mongoose.model("Maintenance", MaintenanceSchema);
export default Maintenance;
