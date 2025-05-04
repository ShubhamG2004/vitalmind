import mongoose from "mongoose";

const SuggestionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  week: String,
  suggestionText: String,
}, { timestamps: true });

export default mongoose.models.Suggestion || mongoose.model("Suggestion", SuggestionSchema);
