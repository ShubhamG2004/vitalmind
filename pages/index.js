import Head from "next/head";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { 
  FiActivity, 
  FiTrendingUp, 
  FiHeart, 
  FiDroplet, 
  FiClock, 
  FiBarChart2,
  FiZap,
  FiUsers,
  FiShield,
  FiLogIn,
  FiUser,
  FiCheck,
  FiCalendar,
  FiPieChart,
  FiArrowRight
} from "react-icons/fi";
import Image from "next/image";

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
      description: "Create your free account in seconds",
      icon: <FiUser className="text-purple-600 text-xl" />
    },
    {
      number: "2",
      title: "Log Daily Metrics",
      description: "Track your key health indicators",
      icon: <FiCheck className="text-purple-600 text-xl" />
    },
    {
      number: "3",
      title: "Get Insights",
      description: "Receive AI-powered analysis",
      icon: <FiPieChart className="text-purple-600 text-xl" />
    },
    {
      number: "4",
      title: "Improve",
      description: "Implement suggestions and track progress",
      icon: <FiTrendingUp className="text-purple-600 text-xl" />
    }
  ];

  const testimonials = [
    {
      quote: "VitalMind helped me identify patterns in my sleep and nutrition that I never noticed before. The AI suggestions are surprisingly accurate!",
      name: "Sarah K.",
      role: "Nutritionist",
      stars: 5
    },
    {
      quote: "As a fitness coach, I recommend VitalMind to all my clients. The tracking features are comprehensive yet easy to use.",
      name: "Michael T.",
      role: "Fitness Coach",
      stars: 5
    },
    {
      quote: "The visualization tools helped me understand my health journey better than any other app I've tried.",
      name: "Priya M.",
      role: "Long-time User",
      stars: 5
    }
  ];

  return (
    <>
      <Head>
        <title>VitalMind – Personal Health Diary with AI</title>
        <meta name="description" content="Track your health and get AI-powered insights with VitalMind – your intelligent health diary." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <FiActivity className="text-purple-600 text-2xl" />
            <span className="text-xl font-bold text-gray-800">VitalMind</span>
          </Link>
          
          <div>
            {status === "authenticated" ? (
              <Link href="/dashboard" className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition duration-300">
                <FiUser className="text-white" />
                <span>Dashboard</span>
              </Link>
            ) : (
              <button
                onClick={() => signIn()}
                className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                <FiLogIn className="text-white" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4 sm:px-6 pt-24 pb-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
              Take Control of Your <span className="text-purple-600">Health Journey</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto md:mx-0">
              VitalMind combines health tracking with artificial intelligence to help you understand and improve your wellbeing.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {status === "authenticated" ? (
                <Link href="/dashboard" className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-medium px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  Go to Dashboard <FiArrowRight className="ml-2" />
                </Link>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-medium px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Get Started For Free <FiArrowRight className="ml-2" />
                </button>
              )}
              <Link href="#features" className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-purple-600 font-medium px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-200">
                Learn More
              </Link>
            </div>
           
          </div>
          <div className="relative w-full h-80 sm:h-80 lg:h-[400px]">
            <Image 
              src="/Hero.png" 
              alt="VitalMind Dashboard Preview"
              layout="fill"
              objectFit="contain"
              className="rounded-lg shadow-xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-medium mb-3">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">Powerful Health Tracking</h2>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Everything you need to track, analyze, and improve your health in one beautiful interface
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gray-50 p-8 rounded-xl hover:bg-purple-50 transition-all duration-300 hover:-translate-y-2 border border-gray-100 hover:border-purple-100"
              >
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-medium mb-3">
              Simple Steps
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">How VitalMind Works</h2>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Transform your health in just a few simple steps
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center border border-gray-100 hover:border-purple-100"
              >
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 relative">
                  {step.number}
                  <div className="absolute -right-2 -top-2 bg-white p-1 rounded-full shadow-sm">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-medium mb-3">
              Interface
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">Beautiful & Intuitive</h2>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Designed for clarity and ease of use on any device
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition duration-300">
              <Image 
                src="/sty1.png"
                alt="Dashboard Screen"
                layout="fill"
                objectFit="cover"
                className="hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition duration-300 flex items-end p-6">
                <span className="text-white font-medium">Dashboard Overview</span>
              </div>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition duration-300">
              <Image 
                src="/sty2.png"
                alt="Tracking Screen"
                layout="fill"
                objectFit="cover"
                className="hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition duration-300 flex items-end p-6">
                <span className="text-white font-medium">Health Tracking</span>
              </div>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition duration-300">
              <Image 
                src="/sty3.png"
                alt="Analytics Screen"
                layout="fill"
                objectFit="cover"
                className="hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition duration-300 flex items-end p-6">
                <span className="text-white font-medium">Advanced Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-medium mb-3">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">What Our Users Say</h2>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Join thousands of happy users transforming their health
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                <div className="flex mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <FiStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Transform Your Health?</h2>
          <p className="text-purple-100 text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of users who are taking control of their wellbeing with VitalMind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {status === "authenticated" ? (
              <Link href="/dashboard" className="inline-flex items-center justify-center bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Go to Dashboard <FiArrowRight className="ml-2" />
              </Link>
            ) : (
              <button
                onClick={() => signIn()}
                className="inline-flex items-center justify-center bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Start Your Free Journey Today <FiArrowRight className="ml-2" />
              </button>
            )}
            <Link href="#features" className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <FiActivity className="text-purple-400 text-2xl" />
                <span className="text-xl font-bold">VitalMind</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your intelligent health companion for better living.
              </p>
              <div className="flex space-x-4">
                {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((social) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-white transition duration-300">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="#features" className="hover:text-white transition duration-300">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition duration-300">Pricing</Link></li>
                <li><Link href="/blog" className="hover:text-white transition duration-300">Blog</Link></li>
                <li><Link href="/updates" className="hover:text-white transition duration-300">Updates</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition duration-300">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-white transition duration-300">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition duration-300">Contact</Link></li>
                <li><Link href="/press" className="hover:text-white transition duration-300">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Legal</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white transition duration-300">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition duration-300">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-white transition duration-300">Cookie Policy</Link></li>
                <li><Link href="/security" className="hover:text-white transition duration-300">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} VitalMind. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}

function FiStar() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );
}