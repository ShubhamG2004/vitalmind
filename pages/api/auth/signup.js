import { hash } from 'bcryptjs';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    return res.status(400).json({ message: 'You are already logged in' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !email.includes('@') || !password || password.trim().length < 8) {
    return res.status(422).json({ 
      message: 'Invalid input - password must be at least 8 characters long' 
    });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    
    const existingUser = await db.collection('users').findOne({
      email: email.toLowerCase()
    });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    
    const hashedPassword = await hash(password, 12);

    const result = await db.collection('users').insertOne({
      email: email.toLowerCase(),
      password: hashedPassword,
      emailVerified: null, 
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return res.status(201).json({ 
      message: 'User created successfully', 
      user: { 
        id: result.insertedId.toString(),
        email: email.toLowerCase()
      } 
    });

  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ 
      message: 'Something went wrong', 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}