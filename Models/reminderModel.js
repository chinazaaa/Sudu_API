const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema(
  {
    owner_ref_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "salonOwner",
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
    },
    message: { type: String, required: true },
    status: { type: String, required: true },
    reminder_date: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("reminder", reminderSchema);
