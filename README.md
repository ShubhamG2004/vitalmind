## 🩺 VitalMind - Personal Health Diary with AI

## Problem Statement - 
2. Personal Health Diary with AI
Create a full-stack app that tracks user health data, uses AI to suggest improvements, and 
stores data securely.
• Azure Service: Azure Health Bot + Azure Cosmos DB

A full-stack AI-powered Personal Health Diary web application built with Next.js, MongoDB Atlas (via Azure), NextAuth for authentication, and Gemini API for AI-based health insights.

## 📑 Table of Contents

- [Overview](#Overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Web Pages](#Web-Pages)
- [Process](#process)
- [Future scope](#future-scope)
- [Installation](#installation)
- [Contributing](#contributing)


## Overview

This platform enables users to log their health records, receive AI-generated suggestions, and manage their wellness journey efficiently in one place. With secure authentication and cloud-based database integration, the app is responsive, scalable, and user-friendly.

video link :https://drive.google.com/file/d/1-DXHtctFS3eafL5a37iobLQrh7EqcIdP/view?usp=sharing


## 🚀 Features:

1.User Authentication with NextAuth.js (Credentials + Google)

2.Create / Read / Delete Health Entries

3.AI Integration with Gemini API for health suggestions

4.Cloud Database using MongoDB Atlas hosted via Microsoft Azure

5.Dashboard with Analytics.

6.Secure Sessions and CSRF protection

7.Fully Responsive UI with Tailwind CSS..

****************************************

## 🛠 Tech Stack            Technology	Description:

Next.js	           - React Framework for SSR & routing

MongoDB Atlas	     - Cloud database hosted via Azure

NextAuth.js	       - Authentication (Google + Credentials)

Gemini API	       - AI integration for health recommendations

Tailwind CSS	     - Utility-first CSS framework.

*********************************************
## Web Pages 
********************************************
## (1)index.js Page :-

1.Responsive Landing Page: Features a modern UI with navbar (VitalMind logo + login/dashboard button) and responsive design for all devices.

2.Key Sections: Includes hero banner, features grid, step-by-step guide, app screenshots, testimonials, and a CTA section.

3.NextAuth Integration: Uses useSession() for auth-state checks, showing login/dashboard buttons conditionally.

4.Optimized Media: Next.js Image component for fast-loading hero image and app screenshots.

5.Dynamic Content: Easily customizable features, steps, and testimonials stored in arrays for quick updates.

![image alt](https://github.com/ShubhamG2004/vitalmind/blob/master/Index_page.png?raw=true)


*************************************
## (2) dashboard.js 

1.Health Overview Dashboard: Shows key metrics like sleep, water intake, and mood trends in easy-to-read charts.

2.AI-Powered Suggestions: Provides personalized health tips based on your logged data (e.g., "Drink more water!").

3.Interactive Charts: Visualizes your progress with colorful line/bar graphs for sleep, hydration, and mood.

4.Quick Stats: Displays averages, streaks, and "good days" to motivate you.

5.Mobile-Friendly: Works smoothly on phones and tablets, so you can check your health anytime.

![image alt](https://github.com/ShubhamG2004/vitalmind/blob/master/d1.png?raw=true)

![image alt](https://github.com/ShubhamG2004/vitalmind/blob/master/d2.png?raw=true)

**************************************

## (3)Health-log.js 

1. Daily Health Tracker: Simple form to log sleep, water, meals, mood, and notes with date picker.

2. History View: Shows past entries in clean cards with expandable details for quick review.

3. One-Click Logging: Fast submission with auto-reset form—just tap "Save" and done!

![image alt](https://github.com/ShubhamG2004/vitalmind/blob/master/health_log.png?raw=true)

************************************

## (4) Trends.js 

1. Visual Health Trends: Interactive charts show your sleep, hydration, and mood patterns over time.

2. Time Filters: Switch between weekly, monthly, or all-time views to spot long-term habits.

3. At-a-Glance Insights: Color-coded graphs highlight correlations (e.g., better sleep on hydrated days).

![image alt](https://github.com/ShubhamG2004/vitalmind/blob/master/trends.png?raw=true)

************************************

## (5) history.js 

1. The History page displays all past health entries made by the user in a clean, card layout.

2. Each entry shows sleep, meals, mood, water intake, and AI suggestions.

3. It helps users track their wellness trends over time for better self-awareness.

![image alt](https://github.com/ShubhamG2004/vitalmind/blob/master/history.png?raw=true)

*************************************

## (6)ai-chatbot.js

1. The AI Chatbot page allows users to get instant health tips using the Gemini API.

2. It generates personalized suggestions based on sleep, water, meals, mood, and notes.

3. Simple form inputs send data to the backend, which returns smart, friendly advice.

![image alt](https://github.com/ShubhamG2004/vitalmind/blob/master/ai_chatbot.png?raw=true)

**************************************************

## Process

1. Planning & Design
   
Define the core features: user authentication, health entry logs, AI chatbot, history tracking, export options.

Design wireframes for each page: Sign-in, Dashboard, AI Chatbot, History, etc.

Choose your tech stack: Next.js, MongoDB Atlas, NextAuth, Gemini API, Tailwind CSS.

2. Setting Up the Project
   
Initialize a Next.js app using npx create-next-app.

Set up Tailwind CSS for styling.

Connect MongoDB Atlas using mongoose and create schemas for user health data.

Configure NextAuth for user authentication (Google + credentials).

3. Building Pages

Sign-In Page: Secure login form with email/password and Google authentication.

Dashboard Page: Form to input health data (sleep, meals, water, notes, mood). Show AI suggestions.

AI Chatbot Page: Connect with Gemini API to answer user questions.

History Page: Show list of past entries with date, details, and AI advice.

Export Feature: Allow downloading data as PDF or CSV using libraries like jspdf or papaparse.

4. Integrating AI (Gemini API)
   
Create an API route in Next.js to send user input to Gemini.

Parse the response and show suggestions in the UI.

Store both input and response in MongoDB for history.

5. Testing & Deployment
   
Test all user flows: signup, login, data entry, AI response, export, logout.

Fix responsive design issues using Tailwind's utilities.

Deploy the app using Vercel for frontend and connect to MongoDB Atlas.


***************************************
## Future scope :


1.Integration with Wearables: Sync with smartwatches and fitness bands (e.g., Fitbit, Apple Watch) to auto-log sleep, steps, heart rate, etc.

2.Advanced AI Insights: Use deeper machine learning models to detect health anomalies, suggest lifestyle improvements, or predict potential health risks.

3.Doctor/Expert Access: Allow users to share their health logs with doctors or nutritionists and get real-time professional feedback.

4.Medication Tracking: Add features to remind users about medications and track their intake patterns.

5.Multilingual Support: Expand accessibility by offering the app in regional and international languages for wider user adoption.

********************************************
## Installation

1. Clone the repository
   
   git clone https://github.com/ShubhamG2004/vitalmind.git
  
   cd vitalmind

2. Install dependencies
   
   npm install

3. Create a `.env.local` file and add the following environment variables:
   
   (Replace placeholder values with your actual keys)
   
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   MONGODB_URI=your_mongodb_connection_string
   
   GEMINI_API_KEY=your_gemini_api_key
   

5. Run the development server

   npm run dev

************************************
## 🤝 Contributing

This project is made possible with the contributions of:

Abhijeet Khomane – Core Contributor

