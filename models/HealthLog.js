import mongoose from "mongoose";

const HealthLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: String, required: true },
  sleepHours: Number,
  waterIntake: Number,
  meals: String,
  mood: String,
  notes: String,
}, { timestamps: true });

export default mongoose.models.HealthLog || mongoose.model("HealthLog", HealthLogSchema);
