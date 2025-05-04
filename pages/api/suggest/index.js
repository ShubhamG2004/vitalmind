import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { connectToDatabase } from "@/lib/mongodb";
import Suggestion from "@/models/Suggestion";
import User from "@/models/User";

export default async function handler(req, res) {
  await connectToDatabase();
  const session = await getServerSession(req, res, authOptions);

  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const user = await User.findOne({ email: session.user.email });

  if (req.method === "POST") {
    const { week, logs } = req.body;

    const suggestionText = `Based on your logs, aim to increase water intake and sleep more consistently.`;

    const suggestion = await Suggestion.create({
      userId: user._id,
      week,
      suggestionText,
    });

    return res.status(201).json(suggestion);
  }

  return res.status(405).end(); 
}
