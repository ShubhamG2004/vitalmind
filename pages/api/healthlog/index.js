import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { connectToDatabase } from "@/lib/mongodb";
import HealthLog from "@/models/HealthLog";
import User from "@/models/User";

export default async function handler(req, res) {
  await connectToDatabase();
  const session = await getServerSession(req, res, authOptions);

  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const user = await User.findOne({ email: session.user.email });

  if (req.method === "POST") {
    const { date, sleepHours, waterIntake, meals, mood, notes } = req.body;

    const newLog = await HealthLog.create({
      userId: user._id,
      date,
      sleepHours,
      waterIntake,
      meals,
      mood,
      notes,
    });

    return res.status(201).json(newLog);
  }

  if (req.method === "GET") {
    const logs = await HealthLog.find({ userId: user._id }).sort({ date: -1 });
    return res.status(200).json(logs);
  }

  return res.status(405).end(); 
}
