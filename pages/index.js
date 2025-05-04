import Head from "next/head";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { 
  FiActivity, 
  FiTrendingUp, 
  FiHeart, 
  FiDroplet, 
  FiClock, 
  FiAward,
  FiBarChart2,
  FiZap,
  FiCheckCircle,
  FiUsers,
  FiShield,
  FiSmartphone
} from "react-icons/fi";

export default function Home() {
  const { data: session, status } = useSession();

  const features = [
    {
      icon: <FiActivity className="text-purple-600 text-2xl" />,
      title: "Comprehensive Tracking",
      description: "Log sleep, water intake, nutrition, mood, and symptoms with our intuitive interface."
    },
    {
      icon: <FiZap className="text-purple-600 text-2xl" />,
      title: "AI Health Assistant",
      description: "Get personalized suggestions based on your data patterns and health goals."
    },
    {
      icon: <FiBarChart2 className="text-purple-600 text-2xl" />,
      title: "Visual Analytics",
      description: "Understand your health trends through beautiful, interactive charts and graphs."
    },
    {
      icon: <FiHeart className="text-purple-600 text-2xl" />,
      title: "Wellness Scores",
      description: "Track your overall wellness with our proprietary VitalScore algorithm."
    },
    {
      icon: <FiClock className="text-purple-600 text-2xl" />,
      title: "Reminders & Alerts",
      description: "Never miss important health routines with our smart notification system."
    },
    {
      icon: <FiShield className="text-purple-600 text-2xl" />,
      title: "Data Privacy",
      description: "Your health data is encrypted and never shared without your permission."
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Sign Up",
      description: "Create your free account in seconds"
    },
    {
      number: "2",
      title: "Log Daily Metrics",
      description: "Track your key health indicators"
    },
    {
      number: "3",
      title: "Get Insights",
      description: "Receive AI-powered analysis"
    },
    {
      number: "4",
      title: "Improve",
      description: "Implement suggestions and track progress"
    }
  ];

  return (
    <>
      <Head>
        <title>VitalMind – Personal Health Diary with AI</title>
        <meta
          name="description"
          content="Track your health and get AI-powered insights with VitalMind – your intelligent health diary."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            Take Control of Your <span className="text-purple-600">Health Journey</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            VitalMind combines health tracking with artificial intelligence to help you understand and improve your wellbeing.
          </p>

          <div className="mt-10">
            {status === "authenticated" ? (
              <Link href="/dashboard" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                Go to Dashboard
              </Link>
            ) : (
              <button
                onClick={() => signIn()}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                Get Started For Free
              </button>
            )}
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-3 text-left max-w-5xl mx-auto">
            {features.slice(0, 3).map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100">
                <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 mt-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Powerful Features</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Everything you need to track, analyze, and improve your health
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg hover:bg-purple-50 transition-all">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">How VitalMind Works</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Transform your health in just a few simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                <p className="text-gray-600 mt-2">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">Trusted by Health-Conscious Individuals</h2>
          
          <div className="bg-purple-50 p-8 rounded-xl">
            <blockquote className="text-xl italic text-gray-700 mb-6">
              "VitalMind helped me identify patterns in my sleep and nutrition that I never noticed before. The AI suggestions are surprisingly accurate!"
            </blockquote>
            <div className="font-medium text-gray-800">Sarah K.</div>
            <div className="text-purple-600 text-sm">Nutritionist & VitalMind User</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Health?</h2>
          <p className="text-purple-100 text-xl mb-8">
            Join thousands of users who are taking control of their wellbeing with VitalMind.
          </p>
          <button
            onClick={() => status === "authenticated" ? null : signIn()}
            className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            {status === "authenticated" ? (
              <Link href="/dashboard">Go to Dashboard</Link>
            ) : (
              "Start Your Free Journey Today"
            )}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-white">VitalMind</h2>
              <p className="text-gray-400 mt-2">Your intelligent health companion</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition">Terms</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link>
            </div>
          </div>
          <div className="mt-8 text-center md:text-left text-gray-500 text-sm">
            © {new Date().getFullYear()} VitalMind. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}